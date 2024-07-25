import { Block } from '@shared/lib/Block'
import { Button, Input, InputField } from '@shared/partials';
import { ChangeAvatarForm } from '@widgets/ChangeAvatarForm';
import { Form } from '@shared/partials/Form';
import ChangeAvatarModalTemplate from './ChangeAvatarModal.hbs?raw';
import { IChangeAvatarModalProps } from './model';
import { changeAvatarModalController } from './ChangeAvatarModalController';

export class ChangeAvatarModal extends Block {
    constructor(props: IChangeAvatarModalProps) {
        super(props)
    }

    render() {
        return this.compile(ChangeAvatarModalTemplate, this.props);
    }
}

export const fileInput = new InputField({
    className: 'input-field__file modal__input-file',
    id: 'profile-change-avatar',
    label: 'Выбрать файл на компьютере',
    input: new Input({
        type: 'file',
        id: 'profile-change-avatar',
        name: 'change_avatar',
        className: 'input-field__element',
    }),
})

export const button = new Button({
    className: 'modal__form-submit-btn',
    text: 'Поменять',
})

export const changeAvatarForm = new ChangeAvatarForm({
    fileInput,
    button,
    modalError: '',
})
export const changeAvatarModal = new ChangeAvatarModal({
    modalTitleError: false,
    modalTitle: 'Загрузите файл',
    changeAvatarForm: new Form({
        formContent: changeAvatarForm,
        events: {
            submit: (e) => {
                e.preventDefault()
                changeAvatarModalController.sendAvatar(e)
            },
        },
    }),
})
