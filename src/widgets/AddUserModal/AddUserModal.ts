import { Block, IBlockProps } from '@shared/lib/Block'
import { Button, Input, InputField } from '@shared/partials';
import AddUserModalTemplate from './AddUserModal.hbs?raw';
import { IAddUserModalProps } from './model';
import { AddUserForm } from '@widgets/AddUserForm';
import { Form } from '@shared/partials/Form';

export class AddUserModal extends Block {
    constructor(props: IAddUserModalProps) {
        super(props)
    }

    render() {
        return this.compile(AddUserModalTemplate, this.props);
    }

    componentDidMount(props: IBlockProps): boolean {
        return true
    }
}

export const loginInput = new InputField({
    id: 'add_user_login',
    label: 'Логин',
    input: new Input({
        type: 'text',
        id: 'add_user_login',
        name: 'login',
        className: 'input-field__element',
        value: 'legeida2',
    }),
})

export const button = new Button({
    className: 'modal__form-submit-btn',
    text: 'Поменять',
})

export const addUserForm = new AddUserForm({
    input: loginInput,
    button,
    modalError: '',
})
export const addUserModal = new AddUserModal({
    modalTitleError: false,
    modalTitle: 'Добавить пользователя',
    addUserForm: new Form({
        formContent: addUserForm,
    })
})
