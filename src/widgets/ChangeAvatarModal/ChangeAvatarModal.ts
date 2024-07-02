import { Block } from '@shared/lib/Block'
import { Button, Input, InputField } from '@shared/partials';
import ChangeAvatarModalTemplate from './ChangeAvatarModal.hbs?raw';
import { IChangeAvatarModalProps } from './model';

export class ChangeAvatarModal extends Block {
    constructor(props: IChangeAvatarModalProps) {
        super(props)
    }

    render() {
        return this.compile(ChangeAvatarModalTemplate, this.props);
    }
}

const fileInput = new InputField({
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

const button = new Button({
    className: 'modal__form-submit-btn',
    text: 'Поменять',
    events: {
        click: (e) => {
            e.preventDefault()
        },
    },
})
export const changeAvatarModal = new ChangeAvatarModal({
    modalTitle: '<h2 class="modal__title modal__title_error">Ошибка, попробуйте ещё раз</h2>',
    fileInput,
    button,
    modalError: '<div class="modal__form-error">Нужно выбрать файл</div>',
})
