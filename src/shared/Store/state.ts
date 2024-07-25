import { User } from '@entities/User'
import { Chat, Chats } from '@entities/Chat'

export interface State {
    user: User | null
    chats: Chats | null | []
    currentChat: Chat | null
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
        phone: '',
    },
    chats: [],
    currentChat: null,

}
