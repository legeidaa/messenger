import { Avatar, Button, Input, Link, Modal, ProfileDataRow } from '@shared/partials/index.ts'
import { Form } from '@shared/partials/Form/index.ts'
import type { IFormProps } from '@shared/partials/Form/index.ts'
import { Block } from '@shared/lib/Block/index.ts'
import { router } from '@shared/lib/Router/Router.ts'
import { PagesPaths } from '@shared/lib/Router/model';
import ProfileTemplate from './ProfilePage.hbs?raw'
import { IProfilePageProps, IProfilePageState } from './model.ts'
import { validateComparePassword, validateEmail, validateLogin, validateName, validatePassword, validatePhone, validateSecondName } from './validation.ts'
import { connect } from '@shared/Store/Hoc.ts'
import { store } from '@shared/Store/Store.ts'
import { profileController } from './ProfileController.ts'
import { authAPI } from '@shared/api/AuthApi.ts'
import { changeAvatarModal } from '@widgets/ChangeAvatarModal/index.ts'
import { avatarController } from '@shared/partials/Avatar/index.ts'
import { activateModals } from '@shared/utils/activateModals.ts'

export class ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        super(props)
    }

    render() {
        return this.compile(ProfileTemplate, this.props);
    }

    componentDidUpdate(oldProps: IProfilePageState, newProps: IProfilePageState): boolean {
        console.log("profile componentDidUpdate", oldProps, newProps, this);

        profileController.setProfileFields(oldProps, newProps)

        if (oldProps.user?.avatar !== newProps.user?.avatar) {
            profilePage.children.avatar.setProps({ src: avatarController.getAvatarSrc() })
            activateModals()
        }

        return true
    }
}

const connectedProfilePage = connect(ProfilePage, (state) => ({ user: state.user }))

export const mailRow = new ProfileDataRow({
    id: 'profile_email',
    label: 'Почта',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_email',
        value: store.getState().user?.email,
        placeholder: 'Ваша почта',
        name: 'email',
        type: 'email',
        readonly: true,
        events: {
            blur: validateEmail,
        },
    }),
})

export const loginRow = new ProfileDataRow({
    id: 'profile_login',
    label: 'Логин',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_login',
        value: store.getState().user?.login,
        placeholder: 'Ваш логин',
        name: 'login',
        type: 'text',
        readonly: true,
        events: {
            blur: validateLogin,
        },
    }),
})

export const nameRow = new ProfileDataRow({
    id: 'profile_first_name',
    label: 'Имя',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_first_name',
        value: store.getState().user?.first_name,
        placeholder: 'Ваше имя',
        name: 'first_name',
        type: 'text',
        readonly: true,
        events: {
            blur: validateName,
        },
    }),
})

export const secondNameRow = new ProfileDataRow({
    id: 'profile_second_name',
    label: 'Фамилия',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_second_name',
        value: store.getState().user?.second_name,
        placeholder: 'Ваше имя',
        name: 'second_name',
        type: 'text',
        readonly: true,
        events: {
            blur: validateSecondName,
        },
    }),
})

const display_name = store.getState().user?.display_name
export const displayNameRow = new ProfileDataRow({
    id: 'profile_display_name',
    label: 'Имя в чате',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_display_name',
        value: display_name === null ? '' : display_name,
        placeholder: 'Имя в чате',
        name: 'display_name',
        type: 'text',
        readonly: true,
    }),
})

const profile_phone = store.getState().user?.phone
export const phoneRow = new ProfileDataRow({
    id: 'profile_phone',
    label: 'Телефон',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_phone',
        value: profile_phone,
        placeholder: 'Ваш телефон',
        name: 'phone',
        type: 'tel',
        readonly: true,
        events: {
            blur: validatePhone,
        },
    }),
})

export const profileDataInfo = [
    mailRow,
    loginRow,
    nameRow,
    secondNameRow,
    displayNameRow,
    phoneRow,
]

export const oldPasswordRow = new ProfileDataRow({
    id: 'profile_old_password',
    label: 'Старый пароль',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_old_password',
        value: '***',
        placeholder: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        readonly: false,
        events: {
            blur: (e: Event) => {
                validatePassword(e, oldPasswordRow, 'Старый пароль')
            },
        },
    }),
})

export const newPasswordRow = new ProfileDataRow({
    id: 'profile_new_password',
    label: 'Новый пароль',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_new_password',
        value: '1234',
        placeholder: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
        readonly: false,
        events: {
            blur: (e: Event) => {
                validatePassword(e, newPasswordRow, 'Новый пароль')
                validateComparePassword(e)
            },
        },
    }),
})

export const repeatNewPasswordRow = new ProfileDataRow({
    id: 'profile_repeat_password',
    label: 'Повторите новый пароль',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_repeat_password',
        value: '12345',
        placeholder: 'Повторите новый пароль',
        name: 'repeatNewPassword',
        type: 'password',
        readonly: false,
        events: {
            blur: validateComparePassword,
        },
    }),
})

export const profileDataPass = [
    oldPasswordRow,
    newPasswordRow,
    repeatNewPasswordRow,
]

export const changeDataRow = new ProfileDataRow({
    className: 'profile__footer-row',
    link: new Link({
        href: '#',
        text: 'Изменить данные',
        className: 'profile__link profile__link-data',
        events: {
            click: (e: Event) => {
                e.preventDefault()
                // changeProfileData()
                profileController.changeFieldsToProfileData()
            },
        },
    }),
})

export const changePasswordRow = new ProfileDataRow({
    className: 'profile__footer-row',
    link: new Link({
        href: '#',
        text: 'Изменить пароль',
        className: 'profile__link profile__link-password',
        events: {
            click: (e: Event) => {
                e.preventDefault()
                profileController.changeFieldsToProfilePassword()
            },
        },
    }),
})

export const exitRow = new ProfileDataRow({
    className: 'profile__footer-row',
    link: new Link({
        href: '#',
        text: 'Выйти',
        className: 'link_red profile__link profile__link-exit',
        events: {
            click: async (e: Event) => {
                e.preventDefault()

                try {
                    await authAPI.logout()

                    router.go(PagesPaths.SIGNIN)
                } catch (e) {
                    console.log('Logout failed', e);

                }

            },
        },
    }),
})

export const saveButton = new Button({
    className: 'profile__data-save',
    text: 'Сохранить',
    type: 'submit',
    events: {
        click: (e: Event) => {
            e.preventDefault()
            const profileForm = form.getContent() as HTMLFormElement
            profileForm.requestSubmit()
        },
    },
})

export const profileFooterContent = [
    changeDataRow,
    changePasswordRow,
    exitRow,
]

interface IProfilePageFormProps extends IFormProps {
    canChangeData: false,
    canChangePassword: false,
}

export const formProps: IProfilePageFormProps = {
    className: 'profile__form profile__data',
    id: 'profile_form',
    formContent: profileDataInfo,
    canChangeData: false,
    canChangePassword: false,
    events: {
        submit: (e) => {
            e.preventDefault()
            const data = new FormData(e.target as HTMLFormElement)
            const formDataObj = Object.fromEntries(data.entries())
            console.log(formDataObj)

            profileController.saveData(e)
        },
    },
}
export const form = new Form(formProps)

export const profilePage = new connectedProfilePage({
    asideButton: new Button({
        className: 'button_icon button_arrow button_arrow_left',
        href: '#',
        events: {
            click: (e) => {
                e.preventDefault()
                router.go(PagesPaths.CHAT)
            },
        },
    }),
    avatar: new Avatar({
        profileAvatar: true,
        src: avatarController.getAvatarSrc(),
        events: {
            click: (e) => {
                e.preventDefault()
            },
        }
    }),
    profileName: display_name === null ? '' : display_name,
    form,
    profileFooter: profileFooterContent,
    profileFooterError: '',
    modal: new Modal({
        className: 'modal_small',
        dataModalType: 'change-avatar',
        content: changeAvatarModal,
    }),
})

