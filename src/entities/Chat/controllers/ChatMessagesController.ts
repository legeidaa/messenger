import { store } from "@shared/Store"
import { chatAPI } from "@shared/api/ChatApi"
import { WSTransport, WSTransportEvents } from "@shared/lib/WSTransport"
import { Chat, WSConnection } from "../model"
import { User } from "@entities/User"
import { DialogItem } from "@widgets/DialogItem"

// при получении сообщения обновляем состояние превьюшки чата

class ChatController {
    public WSConnections: WSConnection[] = []

    public async createMessagesConnections(user: User, chats: Chat[]) {
        this.WSConnections.length = 0

        for await (const chat of chats) {
            const tokenData = await chatAPI.getChatToken(chat.id) as unknown as { token: string }
            console.log(tokenData, `wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${tokenData.token}`);

            const ws = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${tokenData.token}`)
            await ws.connect()

            this.WSConnections.push({
                [chat.id]: ws,
            })
            // ws.connect().then(() => {
                //         this.WSConnections.push({
                //             [chat.id]: ws,
                //         })
                //     }).then(() => {
                //         return this.WSConnections
                //     })
                //     // setTimeout(() => {
                //     //     ws.send({
                //     //         content: 'Моё первое сообщение миру!',
                //     //         type: 'message',
                //     //     });             
                //     // }, 1000)
        }
        return this.WSConnections
    }

    public updateDialogsListItem(chat: Chat, dialogItem: DialogItem) {
        const chatId = chat.id
        console.log(chatId, this.WSConnections, this.WSConnections.length);

        this.WSConnections.forEach(connection => {
            // console.log(connection);
            if (connection[chatId]) {
                console.log(connection);

                connection[chatId].on(WSTransportEvents.MESSAGE, (data) => {
                    console.log("Получено сообщение для чата ", chat.title, data);
                });
            }
        })

    }
}

export const chatController = new ChatController()