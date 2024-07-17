import { Block } from '@shared/lib/Block/index'
import { Avatar, Button, Input, InputField, Link, Modal } from '@shared/partials/index';
import { ChatMessages } from '@widgets/ChatMessages/index';
import { Message } from '@widgets/Message/index';
import { ChatDate } from '@shared/partials/ChatDate/index';
import { Textarea } from '@shared/partials/Textarea/index';
import { validator } from '@shared/lib/Validator';
import { Form } from '@shared/partials/Form/index';
import { MessagesForm } from '@widgets/MessagesForm/index';
import { router } from '@shared/lib/Router/Router';
import { PagesPaths } from '@shared/lib/Router/model';
import ChatPageTemplate from './ChatPage.hbs?raw';
import { IChatPageProps, IChatPageState } from './model';
import { addChatModal } from '@widgets/AddChatModal';
import { chatPageController } from './ChatPageController';
import { connect } from '@shared/Store';
import { isEqual } from '@shared/utils/isEqual';
import { addUserModal } from '@widgets/AddUserModal';
import { activateModals } from '@shared/utils';
import { validateMessage } from './validation';

export class ChatPage extends Block {
    constructor(props: IChatPageProps) {
        super(props)
    }

    override render() {
        return this.compile(ChatPageTemplate, this.props);
    }

    componentDidMount(props: IChatPageState): boolean {
        chatPageController.getChats()

        return true
    }

    componentDidUpdate(oldProps: IChatPageState, newProps: IChatPageState): boolean {

        if (oldProps.currentChat?.id !== newProps.currentChat?.id) {
            // console.log("ChatPage currentChat updated", this, oldProps, newProps);
            if (chatPage.props.chatPlaceholder) {
                chatPage.setProps({ chatPlaceholder: false, })
                chatPage.children.chat.dispatchComponentDidMount()
            }
        }

        if (oldProps.chats && newProps.chats && !isEqual(oldProps.chats, newProps.chats)) {
            // console.log("ChatPage chats updated", oldProps, newProps);

            chatPage.setProps({ dialogListItems: chatPageController.createDialogsList() })
        }
        return true
    }
}

const ConnectedChatPage = connect(ChatPage, (state) => ({
    chats: state.chats,
    currentChat: state.currentChat,
    user: state.user
}))

export const messages = [
    new ChatDate({
        date: '19 июня',
    }),
    new Message({
        // eslint-disable-next-line max-len
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        time: '10:56',
    }),
    new Message({
        attachedImgSrc: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
        time: '10:57',
    }),
    new Message({
        text: 'Сообщение получено.',
        time: '10:57',
        isOut: true,
        status: 'sent',
    }),
]

export const footerForm = new Form({
    className: 'chat__footer-form',
    formContent: new MessagesForm({
        footerAttachInput: new InputField({
            id: 'chat_attach_file',
            className: 'input-field__file input-field__file-icon chat__attach-file',
            label: '',
            input: new Input({
                type: 'file',
                name: 'chat_attach_file',
                className: 'input-field__element',
            }),
        }),
        footerTextarea: new Textarea({
            className: 'chat__footer-textarea',
            name: 'message',
            id: 'message',
            placeholder: 'Сообщение',
            events: {
                blur: validateMessage,
            },
        }),
        footerSentBtn: new Button({
            className: 'button_icon button_arrow button_arrow_right',
            type: 'submit',
        }),
    }),
    events: {
        submit: (e: Event) => {
            validateMessage(e)

            const data = new FormData(e.target as HTMLFormElement)
            const formDataObj = Object.fromEntries(data.entries())
            console.log(formDataObj)
        },
    },
})
 export const addUserButton = new Button({
    className: 'button_outlined',
    type: 'button',
    text: 'Добавить пользователя',
    attr: {
        'data-modal': "add-user",
    }
})
addUserButton.componentDidMount = () => {
    console.log('addUserButton mounted', addUserButton);
    
    activateModals()
    return true
}
export const chatMessages = new ChatMessages({
    headerAvatar: new Avatar({
        src: 'https://via.placeholder.com/50x50',
        className: 'chat__header-avatar',
    }),
    headerName: '',
    headerButtons: [
        addUserButton,
        new Button({
            className: 'button_outlined',
            type: 'button',
            text: 'Удалить чат',
            events: {
                click: (e: Event) => {
                    e.preventDefault()
                    chatPageController.deleteChat(e)
                },
            }
        })
    ],
    messages,
    footerForm,

})


export const chatPage = new ConnectedChatPage({
    dialogsHeaderLink: new Link({
        href: PagesPaths.PROFILE,
        text: 'Профиль',
        className: 'dialogs__header-link',
        events: {
            click: (e) => {
                e.preventDefault()
                router.go(PagesPaths.PROFILE)
            },
        },
    }),
    dialogsSearchInput: new Input({
        type: 'text',
        id: 'dialogs_search',
        name: 'dialogs_search',
        className: 'dialogs__search-input',
        placeholder: 'Поиск',
    }),
    dialogsFooter: new Button({
        className: '',
        text: 'Добавить чат',
        type: 'button',
        events: {
            click: (e) => {
                e.preventDefault()
            },
        },
        attr: {
            'data-modal': "add-chat",
        }
    }),
    chatPlaceholder: true,
    dialogListItems: [],
    chat: chatMessages,
    modals: [
        new Modal({
            className: 'modal_small modal-add-user',
            dataModalType: 'add-chat',
            content: addChatModal,
        }),
        new Modal({
            className: 'modal_small modal-add-user',
            dataModalType: 'add-user',
            content: addUserModal,
        }),
    ],
})

addChatModal.props.events = {
    submit: (e: Event) => {
        e.preventDefault()
        chatPageController.addChat(e)
    },
}

addUserModal.props.events = {
    submit: (e: Event) => {
        e.preventDefault()
        chatPageController.addUserToChat(e)
    },
}
