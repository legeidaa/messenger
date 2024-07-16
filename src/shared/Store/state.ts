import { User } from "entities/User"

export interface State {
    user: User | null
    [key: string]: any
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