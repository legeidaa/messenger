import { Block } from '@shared/lib/Block/index'
import { Avatar, Button, Input, Link, Modal } from '@shared/partials/index';
import { ChatMessages } from '@widgets/ChatMessages/index';
import { Message } from '@widgets/Message/index';
import { ChatDate } from '@shared/partials/ChatDate/index';
import { Textarea } from '@shared/partials/Textarea/index';
import { Form } from '@shared/partials/Form/index';
import { MessagesForm } from '@widgets/MessagesForm/index';
import { router } from '@shared/lib/Router/Router';
import { PagesPaths } from '@shared/lib/Router/model';
import { addChatModal } from '@widgets/AddChatModal';
import { connect } from '@shared/Store';
import { isEqual } from '@shared/utils/isEqual';
import { addUserModal } from '@widgets/AddUserModal';
import { activateModals } from '@shared/utils';
import { deleteUserModal } from '@widgets/DeleteUserModal';
import { validateMessage } from './validation';
import { chatPageController } from './ChatPageController';
import { IChatPageProps, IChatPageState } from './model';
import ChatPageTemplate from './ChatPage.hbs?raw';

export class ChatPage extends Block {
    constructor(props: IChatPageProps) {
        super(props)
    }

    override render() {
        return this.compile(ChatPageTemplate, this.props);
    }

    componentDidMount() {
        chatPageController.getInitialData()

        return true
    }

    componentDidUnmount(): boolean {
        chatPage.children.chat.dispatchComponentDidUnmount()
        return true
    }

    componentDidUpdate(oldProps: IChatPageState, newProps: IChatPageState): boolean {
        if (oldProps.currentChat?.id !== newProps.currentChat?.id) {
            if (chatPage.props.chatPlaceholder) {
                chatPage.setProps({ chatPlaceholder: false })
                chatPage.children.chat.dispatchComponentDidMount()
            }
        }

        if (oldProps.chats && newProps.chats && !isEqual(oldProps.chats, newProps.chats)) {
            chatPageController.createDialogsList().then((dialogsList) => {
                chatPage.setProps({ dialogListItems: dialogsList })
            })
        }

        return true
    }
}

const ConnectedChatPage = connect(ChatPage, (state) => ({
    chats: state.chats,
    currentChat: state.currentChat,
    user: state.user,
}))

export const messages: (Message | ChatDate)[] = []

export const footerTextarea = new Textarea({
    className: 'chat__footer-textarea',
    name: 'message',
    id: 'message',
    placeholder: 'Сообщение',
    events: {
        blur: validateMessage,
    },
})

export const footerSentBtn = new Button({
    className: 'button_icon button_arrow button_arrow_right',
    type: 'submit',
})

export const footerForm = new Form({
    className: 'chat__footer-form',
    formContent: new MessagesForm({
        // footerAttachInput: new InputField({
        //     id: 'chat_attach_file',
        //     className: 'input-field__file input-field__file-icon chat__attach-file',
        //     label: '',
        //     input: new Input({
        //         type: 'file',
        //         name: 'chat_attach_file',
        //         className: 'input-field__element',
        //     }),
        // }),
        footerTextarea,
        footerSentBtn,
    }),

})
export const addUserButton = new Button({
    className: 'button_outlined',
    type: 'button',
    text: 'Добавить пользователя',
    attr: {
        'data-modal': 'add-user',
    },
})
addUserButton.componentDidMount = () => {
    activateModals()
    return true
}

export const deleteUserButton = new Button({
    className: 'button_outlined',
    type: 'button',
    text: 'Удалить пользователя',
    attr: {
        'data-modal': 'delete-user',
    },
})
deleteUserButton.componentDidMount = () => {
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
        deleteUserButton,
        new Button({
            className: 'button_outlined',
            type: 'button',
            text: 'Удалить чат',
            events: {
                click: (e: Event) => {
                    e.preventDefault()
                    chatPageController.deleteChat(e)
                },
            },
        }),
    ],
    messages,
    footerForm,
})

// chatMessages.componentDidUpdate = (oldProps: IBlockProps, newProps: IBlockProps): boolean => {
//     const messagesScrollList = chatMessages.getContent().querySelector('.chat__messages')
//     console.log(messagesScrollList);

//     if (messagesScrollList) {
//         console.log('ASDAASDASDDSA', messagesScrollList?.scrollHeight, messagesScrollList.scrollTop);
//         messagesScrollList.scrollTop = 100
//     }
//     return true
// }

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
            'data-modal': 'add-chat',
        },
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
        new Modal({
            className: 'modal_small modal-add-user',
            dataModalType: 'delete-user',
            content: deleteUserModal,
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
