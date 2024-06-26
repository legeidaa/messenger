import { Avatar, Button, Input, Link, Modal, ProfileDataRow } from '@shared/partials/index.ts'
import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'
import { changeAvatarModal } from '@widgets/ChangeAvatarModal/index.ts'
import { Form } from '@shared/partials/Form/index.ts'
import type { IFormProps } from '@shared/partials/Form/index.ts'
import { Block } from '@shared/lib/Block/index.ts'
import ProfileTemplate from './ProfilePage.hbs?raw'
import { IProfilePageProps } from './model.ts'
import { validateComparePassword, validateEmail, validateLogin, validateName, validatePassword, validatePhone, validateSecondName } from './validation.ts'

export class ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        super(props)
    }

    render() {
        return this.compile(ProfileTemplate, this.props);
    }

    componentDidUpdate(oldProps: IProfilePageProps, newProps: IProfilePageProps): boolean {
        return true;
    }
}

export const mailRow = new ProfileDataRow({
    id: 'profile_email',
    label: 'Почта',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_email',
        value: 'pochta@yandex.ru',
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
        value: 'ivanivanov',
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
        value: 'Иван',
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
        value: 'Иванов',
        placeholder: 'Ваше имя',
        name: 'second_name',
        type: 'text',
        readonly: true,
        events: {
            blur: validateSecondName,
        },
    }),
})

export const displayNameRow = new ProfileDataRow({
    id: 'profile_display_name',
    label: 'Имя в чате',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_display_name',
        value: 'Иван',
        placeholder: 'Имя в чате',
        name: 'display_name',
        type: 'text',
        readonly: true,
    }),
})

export const phoneRow = new ProfileDataRow({
    id: 'profile_phone',
    label: 'Телефон',
    input: new Input({
        className: 'profile__data-input',
        id: 'profile_phone',
        value: '+79099673030',
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
                exit()
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

export const profilePage = new ProfilePage({
    asideButton: new Button({
        className: 'button_icon button_arrow button_arrow_left',
        href: '#',
    }),
    avatar: new Avatar({
        profileAvatar: true,
        src: avatarSkeletonSrc,
    }),
    profileName: 'Иван',
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

function exit() {
    console.log('exit')
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
