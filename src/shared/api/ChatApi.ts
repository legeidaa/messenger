import { Api } from './Api';


// TODO заменить эти апи инстансы на базовый класс
export class ChatAPI extends Api {
    constructor() {
        super('/chats')
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