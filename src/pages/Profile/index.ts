
export { default as ProfilePage } from './ProfilePage.hbs?raw';
import './ProfilePage.scss'

import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'


export const ProfilePageArgs = {
    avatarSkeletonSrc,
    canChangeData: false,
    canChangePassword: false,
    showSaveButton: false,
    profileData: [
        {
            id: 'profile-email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            value: 'pochta@yandex.ru',
        },
        {
            id: 'profile-login',
            label: 'Логин',
            type: 'text',
            name: 'login',
            value: 'ivanivanov',
        },
        {
            id: 'profile-first-name',
            label: 'Имя',
            type: 'text',
            name: 'first_name',
            value: 'Иван',
        },
        {
            id: 'profile-second-name',
            label: 'Фамилия',
            type: 'text',
            name: 'second_name',
            value: 'Иванов',
        },
        {
            id: 'profile-display-name',
            label: 'Имя в чате',
            type: 'text',
            name: 'display_name',
            value: 'Иван',
        },
        {
            id: 'profile-phone',
            label: 'Телефон',
            type: 'tel',
            name: 'phone',
            value: '+7 (909) 967 30 30',
        },
    ],
    profileDataPasswords: [
        {
            id: 'profile-old-password',
            label: 'Старый пароль',
            type: 'password',
            name: 'oldPassword',
            value: '***',
        },
        {
            id: 'profile-new-password',
            label: 'Новый пароль',
            type: 'password',
            name: 'newPassword',
            value: '****',
        },
        {
            id: 'profile-repeat-password',
            label: 'Повторите новый пароль',
            type: 'password',
            name: 'newPassword',
            value: '****',
        },
    ]
}

