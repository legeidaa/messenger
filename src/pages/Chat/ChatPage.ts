import { Block } from '@shared/lib/Block'
import { Avatar, Button, Input, InputField, Link } from '@shared/partials';
import { ChatMessages } from '@widgets/ChatMessages';
import { Message } from '@widgets/Message';
import { ChatDate } from '@shared/partials/ChatDate';
import { Textarea } from '@shared/partials/Textarea';
import { validator } from '@shared/lib/Validator';
import { Form } from '@shared/partials/Form';
import { MessagesForm } from '@widgets/MessagesForm';
import { DialogItem } from '../../widgets/DialogItem';
import ChatPageTemplate from './ChatPage.hbs?raw';
import { IChatPageProps } from './model';

export class ChatPage extends Block {
    constructor(props: IChatPageProps) {
        super(props)
    }

    render() {
        return this.compile(ChatPageTemplate, this.props);
    }
}
const messages = [
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

const footerForm = new Form({
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
        submit: validateMessage,
    },
})

const chatMessages = new ChatMessages({
    headerAvatar: new Avatar({
        src: 'https://via.placeholder.com/50x50',
        className: 'chat__header-avatar',
    }),
    headerName: 'Андрей',
    headerButton: new Button({
        className: 'button_icon button_clear button_settings chat__header-settings',
        type: 'button',
    }),
    messages,
    footerForm,

})
function validateMessage(e: Event) {
    e.preventDefault()
    const textareaComponent = footerForm.children.formContent.children.footerTextarea
    const textarea = textareaComponent.getContent() as HTMLTextAreaElement
    const result = validator.checkMessage(textarea.value)

    if (typeof result === 'string') {
        textareaComponent.setProps({
            placeholder: 'Сообщение не должно быть пустым',
            value: '',
        })
        return false
    }
    textareaComponent.setProps({
        placeholder: 'Сообщение',
        value: textarea.value,
    })
    return true
}

export const chatPage = new ChatPage({
    dialogsHeaderLink: new Link({
        href: '#profile',
        text: 'Профиль',
        className: 'dialogs__header-link',
    }),
    dialogsSearchInput: new Input({
        type: 'text',
        id: 'dialogs_search',
        name: 'dialogs_search',
        className: 'dialogs__search-input',
        placeholder: 'Поиск',
    }),
    chatPlaceholder: false,
    dialogListItems: [
        new DialogItem({
            avatar: new Avatar({
                src: 'https://via.placeholder.com/50x50',
            }),
            name: 'Андрей',
            message: 'Привет, как дела?',
            time: '12:00',
            count: 2,
            messageByYou: false,
            selected: false,
        }),
        new DialogItem({
            avatar: new Avatar({
                src: 'https://via.placeholder.com/50x50',
            }),
            name: 'Киноклуб',
            message: 'Какое-то сообщение',
            time: '12:00',
            count: 0,
            messageByYou: true,
            selected: false,
        }),
        new DialogItem({
            avatar: new Avatar({
                src: 'https://via.placeholder.com/50x50',
            }),
            name: 'Андрей',
            message: 'И Human Interface Guidelines и Material Design...',
            time: '1 Мая 2020',
            count: 0,
            messageByYou: false,
            selected: true,
        }),
    ],
    chat: chatMessages,
})
