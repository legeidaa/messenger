import './ProfilePage.scss'

import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'

export { default as ProfilePage } from './ProfilePage.hbs?raw';

export const ProfilePageArgs = {
    avatarSkeletonSrc,
    canChangeData: false,
    canChangePassword: false,
    showSaveButton: false,
    profileData: [
        {
            id: 'profile_email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            value: 'pochta@yandex.ru',
        },
        {
            id: 'profile_login',
            label: 'Логин',
            type: 'text',
            name: 'login',
            value: 'ivanivanov',
        },
        {
            id: 'profile_first_name',
            label: 'Имя',
            type: 'text',
            name: 'first_name',
            value: 'Иван',
        },
        {
            id: 'profile_second_name',
            label: 'Фамилия',
            type: 'text',
            name: 'second_name',
            value: 'Иванов',
        },
        {
            id: 'profile_display_name',
            label: 'Имя в чате',
            type: 'text',
            name: 'display_name',
            value: 'Иван',
        },
        {
            id: 'profile_phone',
            label: 'Телефон',
            type: 'tel',
            name: 'phone',
            value: '+7 (909) 967 30 30',
        },
    ],
    profileDataPasswords: [
        {
            id: 'profile_old_password',
            label: 'Старый пароль',
            type: 'password',
            name: 'oldPassword',
            value: '***',
        },
        {
            id: 'profile_new_password',
            label: 'Новый пароль',
            type: 'password',
            name: 'newPassword',
            value: '****',
        },
        {
            id: 'profile_repeat_password',
            label: 'Повторите новый пароль',
            type: 'password',
            name: 'newPassword',
            value: '****',
        },
    ],
}
