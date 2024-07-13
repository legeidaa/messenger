export interface State {
    user: User | null
    [key: string]: any
}

export interface User {
    id: number | null
    first_name: string
    second_name: string
    display_name: string | null   
    login: string
    avatar: string | null
    email: string
    phone: string
}

export const state: State = {
    user: {
        id: null,
        first_name: '',
        second_name: '',
        display_name: '',
        login: '',
        avatar: null,
        email: '',
        phone: ''
    },
    buttonText: 'Сохранить',
}



// {
//     "id": 1248,
//     "first_name": "Иван",
//     "second_name": "И",
//     "display_name": null,
//     "login": "legeida",
//     "avatar": null,
//     "email": "legeida@yandex.ru",
//     "phone": "+71234567890"
// }