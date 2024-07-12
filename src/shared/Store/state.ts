export interface State {
    user: {} | null
    [key: string]: any
}

export const state: State = {
    user: null,
    buttonText: 'Сохранить',
}

// const user = {
//     "email": "legeida@yandex.ru",
//     "login": "legeida",
//     "first_name": "Иван",
//     "second_name": "Иванов",
//     "phone": "+71234567890",
//     "password": "Aa123456",
//     "password_repeat": "Aa123456"
// }