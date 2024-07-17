import { User } from 'entities/User';
import { Api } from './Api';


type Name = `${User['first_name']}  ${User['second_name']}`

export class ChatAPI extends Api {
    constructor() {
        super('/chats')
    }

    public getChats(offset?: number, limit?: number, title?: string) {
        return this.transport.get('', { data: { offset, limit, title } })
    }

    public getChatUsers(chatId: number, offset?: number, limit?: number, name?: Name, email?: string) {
        return this.transport.get(`/${chatId}/users`, { data: { offset, limit, name, email } })
    }

    public addChat(name: string) {
        return this.transport.post('', { data: { title: name } })
    }

    public addUser(chatId: number, userId: number) {
        return this.transport.put('/users', { data: { users: [userId], chatId } })
    }

    public removeUser(chatId: number, userId: number) {
        return this.transport.delete('/users', { data: { users: [userId], chatId } })
    }

    public list(){}
}

export const chatAPI = new ChatAPI()