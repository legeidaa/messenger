import { Block } from '@shared/lib/Block'
import { Button, Input, InputField } from '@shared/partials';
import { AddChatForm } from '@widgets/AddChatForm';
import { Form } from '@shared/partials/Form';
import AddChatModalTemplate from './AddChatModal.hbs?raw';
import { IAddChatModalProps } from './model';

export class AddChatModal extends Block {
    constructor(props: IAddChatModalProps) {
        super(props)
    }

    render() {
        return this.compile(AddChatModalTemplate, this.props);
    }
}

export const loginInput = new InputField({
    id: 'add-chat-name',
    label: 'Название чата',
    input: new Input({
        type: 'text',
        id: 'add-chat-name',
        name: 'chat_name',
        className: 'input-field__element',
        value: '',
    }),
})

export const fileInput = new InputField({
    className: 'input-field__file modal__input-file',
    id: 'add-chat-avatar',
    label: 'Выберите аватар чата',
    input: new Input({
        type: 'file',
        id: 'add-chat-avatar',
        name: 'chat_avatar',
        className: 'input-field__element',
    }),
})

export const button = new Button({
    className: 'modal__form-submit-btn',
    text: 'Добавить',
})

export const addChatForm = new AddChatForm({
    input: loginInput,
    fileInput,
    button,
    modalError: '',
})
export const addChatModal = new AddChatModal({
    modalTitleError: false,
    modalTitle: 'Добавить чат',
    addUserForm: new Form({
        formContent: addChatForm,
    }),
})
