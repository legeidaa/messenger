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