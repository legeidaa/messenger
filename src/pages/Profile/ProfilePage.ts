import { Block } from '@shared/lib/Block'
import { Avatar, Button, Link, Modal, ProfileDataRow } from '@shared/partials'
import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'
import { changeAvatarModal } from '@widgets/ChangeAvatarModal'
import ProfileTemplate from './ProfilePage.hbs?raw'
import { IProfilePageProps } from './model'

export class ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        super(props)
    }

    render() {
        return this.compile(ProfileTemplate, this.props);
    }

    componentDidUpdate(oldProps: IProfilePageProps, newProps: IProfilePageProps): boolean {
        if (newProps.canChangeData) {
            // profileDataInfo.
            console.log('can change data')
        }
        return true;
    }
}

const mailRow = new ProfileDataRow({
    id: 'profile_email',
    value: 'pochta@yandex.ru',
    name: 'email',
    type: 'email',
    label: 'Почта',
    readonly: true,
})

const loginRow = new ProfileDataRow({
    id: 'profile_login',
    value: 'ivanivanov',
    name: 'login',
    type: 'text',
    label: 'Логин',
    readonly: true,
})

const nameRow = new ProfileDataRow({
    id: 'profile_first_name',
    value: 'Иван',
    name: 'first_name',
    type: 'text',
    label: 'Имя',
    readonly: true,
})

const secondNameRow = new ProfileDataRow({
    id: 'profile_second_name',
    value: 'Иванов',
    name: 'second_name',
    type: 'text',
    label: 'Фамилия',
    readonly: true,
})

const displayNameRow = new ProfileDataRow({
    id: 'profile_display_name',
    value: 'Иван',
    name: 'display_name',
    type: 'text',
    label: 'Имя в чате',
    readonly: true,
})

const phoneRow = new ProfileDataRow({
    id: 'profile_phone',
    value: '+7 (909) 967 30 30',
    name: 'phone',
    type: 'tel',
    label: 'Телефон',
    readonly: true,
})

const profileDataInfo = [
    mailRow,
    loginRow,
    nameRow,
    secondNameRow,
    displayNameRow,
    phoneRow,
]

const oldPasswordRow = new ProfileDataRow({
    id: 'profile_old_password',
    name: 'oldPassword',
    type: 'password',
    label: 'Старый пароль',
    placeholder: '***',
    readonly: false,
})

const newPasswordRow = new ProfileDataRow({
    id: 'profile_new_password',
    name: 'newPassword',
    type: 'password',
    label: 'Новый пароль',
    placeholder: '***',
    readonly: false,
})

const repeatNewPasswordRow = new ProfileDataRow({
    id: 'profile_repeat_password',
    name: 'repeatNewPassword',
    type: 'password',
    label: 'Повторите новый пароль',
    placeholder: '***',
    readonly: false,
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
    events: {
        click: (e: Event) => {
            e.preventDefault()
            saveData()
        },
    },
})

const profileFooterContent = [
    changeDataRow,
    changePasswordRow,
    exitRow,
]

export const profilePage = new ProfilePage({
    asideButton: new Button({
        className: 'button_icon button_arrow button_arrow_left',
        href: '/',
    }),
    avatar: new Avatar({
        profileAvatar: true,
        src: avatarSkeletonSrc,
    }),
    canChangeData: false,
    canChangePassword: false,
    profileName: 'Иван',
    profileData: profileDataInfo,
    profileFooter: profileFooterContent,
    modal: new Modal({
        className: 'modal_small',
        dataModalType: 'change-avatar',
        content: changeAvatarModal,
    }),
})

function changeProfileData() {
    console.log('change profile data')

    profileDataInfo.forEach((row) => {
        console.log(row.props.readonly);

        row.setProps({
            readonly: false,
        })
    })
    const newProfileFooterContent = [
        saveButton,
    ]

    profilePage.setProps({
        canChangeData: true,
        profileFooter: newProfileFooterContent,
    })
}

function changePassword() {
    console.log('change password')

    const newProfileFooterContent = [
        saveButton,
    ]

    profilePage.setProps({
        profileData: profileDataPass,
        canChangePassword: true,
        profileFooter: newProfileFooterContent,
    })
}

function exit() {
    console.log('exit')
}
function saveData() {
    console.log('save data')

    // сохраняем данные в стор, потом меняем состояние

    profileDataInfo.forEach((row) => {
        row.setProps({
            readonly: true,
        })
    })
    const newProfileFooterContent = [
        changeDataRow,
        changePasswordRow,
        exitRow,
    ]
    profilePage.setProps({
        profileData: profileDataInfo,
        canChangePassword: false,
        canChangeData: false,
        profileFooter: newProfileFooterContent,
    })
}
