import { store } from "@shared/Store"
import { ChatAPI, chatAPI } from "@shared/api/ChatApi"
import { WSTransport, WSTransportEvents } from "@shared/lib/WSTransport"
import { Chat, WSConnection, WSMessage } from "../model"
import { User } from "@entities/User"
import { DialogItem } from "@widgets/DialogItem"
import { ApiError } from "@shared/api/model"
import { getMessageTime } from "@shared/utils/getMessageTime"

// при получении сообщения обновляем состояние превьюшки чата

class ChatController {
    public WSConnections: WSConnection[] = []

    public getConnectionById(chatId: number): WSTransport | undefined {
        const connection = this.WSConnections.find((connection) => connection[chatId])

        return connection && connection[chatId]
    }

    public async getChats(offset?: number, limit?: number, title?: string): Promise<string | Chat[]> {
        try {
            const chats = await chatAPI.getChats(offset, limit, title) as unknown as Chat[]
            store.dispatch({ type: 'SET_CHATS', chats })

            return chats
        } catch (err) {
            const error = err as ApiError
            return error.reason
        }
    }

    public async createMessagesConnections(user: User, chats: Chat[]) {
        this.WSConnections.length = 0

        for await (const chat of chats) {
            const tokenData = await chatAPI.getChatToken(chat.id) as unknown as { token: string }
            // console.log(tokenData, `wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${tokenData.token}`);

            const ws = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${tokenData.token}`)
            await ws.connect()

            this.WSConnections.push({
                [chat.id]: ws,
            })

            // setTimeout(() => {
            //     if (chat.id === 16754) {
            //         ws.send({
            //             content: Math.random().toFixed(3) + ' Моё первое сообщение миру!',
            //             type: 'message',
            //         });
            //     }
            // }, 10000)
        }
        return this.WSConnections
    }

    public updateDialogsListItem(chat: Chat, dialogItem: DialogItem) {
        const chatId = chat.id
        const connection = this.getConnectionById(chatId)

        connection?.on(WSTransportEvents.MESSAGE, async (data: WSMessage) => {
            const newChats = await this.getChats()
            // console.log("Получено сообщение для чата ", chat.title, data, newChats);
            if(data.type === 'message') {
                Array.isArray(newChats) && newChats.forEach(async (newChat) => {
                    if (newChat.id === chatId) {
                        const unreadCount = await chatAPI.getUnreadMessagesCount(chatId) as unknown as { unread_count: number }
                        const messageName = newChat.last_message.user.display_name
                            ? newChat.last_message.user.display_name + ': '
                            : newChat.last_message.user.first_name + ': '
    
                        dialogItem.setProps({
                            message: newChat.last_message.content,
                            time: getMessageTime(newChat.last_message.time),
                            count: unreadCount.unread_count,
                            messageName
                        })
                    }
                })
            }
        })
    }

    public async getOldMessages (){

    }
}

export const chatController = new ChatController()