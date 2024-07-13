import { Avatar, Button, Input, Link, Modal, ProfileDataRow } from '@shared/partials/index.ts'
import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'
import { changeAvatarModal } from '@widgets/ChangeAvatarModal/index.ts'
import { Form } from '@shared/partials/Form/index.ts'
import type { IFormProps } from '@shared/partials/Form/index.ts'
import { Block, IBlockProps } from '@shared/lib/Block/index.ts'
import { router } from '@shared/lib/Router/Router.ts'
import { PagesPaths } from '@shared/lib/Router/model';
import ProfileTemplate from './ProfilePage.hbs?raw'
import { IProfilePageProps, IProfilePageState } from './model.ts'
import { validateComparePassword, validateEmail, validateLogin, validateName, validatePassword, validatePhone, validateSecondName } from './validation.ts'
import { connect } from '@shared/Store/Hoc.ts'
import { store } from '@shared/Store/Store.ts'

export class ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        super(props)
    }

    render() {
        return this.compile(ProfileTemplate, this.props);
    }

    componentDidUpdate(oldProps: IProfilePageState, newProps: IProfilePageState): boolean {
        console.log("profile componentDidUpdate", oldProps, newProps, this);
        if (newProps.user) {
            if (oldProps.user.email !== newProps.user.email) {
                mailRow.children.input.setProps({ value: newProps.user.email })
            }
            if (oldProps.user.login !== newProps.user.login) {
                loginRow.children.input.setProps({ value: newProps.user.login })
            }
            if (oldProps.user.first_name !== newProps.user.first_name) {
                nameRow.children.input.setProps({ value: newProps.user.first_name })
                profilePage.setProps({ profileName: newProps.user.first_name })
            }
            if (oldProps.user.second_name !== newProps.user.second_name) {
                secondNameRow.children.input.setProps({ value: newProps.user.second_name })
            }
            if (oldProps.user.display_name !== newProps.user.display_name) {
                displayNameRow.children.input.setProps({ value: newProps.user.display_name })
            }
            if (oldProps.user.phone !== newProps.user.phone) {
                phoneRow.children.input.setProps({ value: newProps.user.phone })
            }
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

const profileDataInfo = [
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

const profileDataPass = [
    oldPasswordRow,
    newPasswordRow,
    repeatNewPasswordRow,
]

const changeDataRow = new ProfileDataRow({
    className: 'profile__footer-row',
    link: new Link({
        href: '#',
        text: 'Изменить данные',
        className: 'profile__link profile__link-data',
        events: {
            click: (e: Event) => {
                e.preventDefault()
                changeProfileData()
            },
        },
    }),
})

const changePasswordRow = new ProfileDataRow({
    className: 'profile__footer-row',
    link: new Link({
        href: '#',
        text: 'Изменить пароль',
        className: 'profile__link profile__link-password',
        events: {
            click: (e: Event) => {
                e.preventDefault()
                changePassword()
            },
        },
    }),
})

const exitRow = new ProfileDataRow({
    className: 'profile__footer-row',
    link: new Link({
        href: '#',
        text: 'Выйти',
        className: 'link_red profile__link profile__link-exit',
        events: {
            click: (e: Event) => {
                e.preventDefault()
                router.go(PagesPaths.SIGNIN)
            },
        },
    }),
})

const saveButton = new Button({
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

const profileFooterContent = [
    changeDataRow,
    changePasswordRow,
    exitRow,
]

interface IProfilePageFormProps extends IFormProps {
    canChangeData: false,
    canChangePassword: false,
}

const formProps: IProfilePageFormProps = {
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

            saveData(e)
        },
    },
}
const form = new Form(formProps)

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
        src: avatarSkeletonSrc,
    }),
    profileName: display_name === null ? '' : display_name,
    form,
    profileFooter: profileFooterContent,
    modal: new Modal({
        className: 'modal_small',
        dataModalType: 'change-avatar',
        content: changeAvatarModal,
    }),
})

function changeProfileData() {
    profileDataInfo.forEach((row) => {
        row.children.input.setProps({
            readonly: false,
        })
    })
    const newProfileFooterContent = [
        saveButton,
    ]
    form.setProps({
        canChangeData: true,
    })
    profilePage.setProps({
        profileFooter: newProfileFooterContent,
    })
}

function changePassword() {
    const newProfileFooterContent = [
        saveButton,
    ]
    form.setProps({
        formContent: profileDataPass,
        canChangePassword: true,
    })
    profilePage.setProps({
        profileFooter: newProfileFooterContent,
    })
}

function saveData(e: Event) {
    // сохраняем данные в стор, потом меняем состояние
    if (form.props.canChangePassword) {
        if (
            (
                validatePassword(e, newPasswordRow, 'Новый пароль')
                && validatePassword(e, oldPasswordRow, 'Старый пароль')
                && validateComparePassword(e)
            ) === false
        ) {
            validatePassword(e, newPasswordRow, 'Новый пароль')
            validatePassword(e, oldPasswordRow, 'Старый пароль')
            validateComparePassword(e)

            return
        }
    }

    if (form.props.canChangeData) {
        if (
            (
                validateEmail(e)
                && validateName(e)
                && validatePhone(e)
                && validateLogin(e)
                && validateSecondName(e)
            ) === false
        ) {
            validateEmail(e)
            validateName(e)
            validatePhone(e)
            validateLogin(e)
            validateSecondName(e)

            return
        }
    }

    profileDataInfo.forEach((row) => {
        row.children.input.setProps({
            readonly: true,
        })
    })
    const newProfileFooterContent = [
        changeDataRow,
        changePasswordRow,
        exitRow,
    ]

    form.setProps({
        formContent: profileDataInfo,
        canChangePassword: false,
        canChangeData: false,
    })
    profilePage.setProps({
        profileFooter: newProfileFooterContent,
    })
}
