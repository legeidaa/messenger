import { store } from '@shared/Store'
import { chatAPI } from '@shared/api/ChatApi'
import { WSTransport, WSTransportEvents } from '@shared/lib/WSTransport'
import { User } from '@entities/User'
import { DialogItem } from '@widgets/DialogItem'
import { ApiError } from '@shared/api/model'
import { getMessageTime } from '@shared/utils/getMessageTime'
import { Chat, WSConnection, WSMessageData } from '../model'

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
            console.log(store.getState().chats, 'chats');

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
        }
        return this.WSConnections
    }

    public updateDialogsListItem(chat: Chat, dialogItem: DialogItem) {
        const chatId = chat.id
        const connection = this.getConnectionById(chatId)

        connection?.on(WSTransportEvents.MESSAGE, async (data: WSMessageData) => {
            const newChats = store.getState().chats

            if (data.type === 'message') {
                if (Array.isArray(newChats)) {
                    newChats.forEach(async (newChat) => {
                        if (newChat.id === chatId) {
                            const lastMessageUsers = await chatAPI.getChatUsers(chatId) as unknown as User[]
                            const lastMessageUser = lastMessageUsers.find((user) => {
                                if (user.id && user.id === Number(data.user_id)) {
                                    return user
                                }
                                return null
                            })

                            console.log(lastMessageUser);
                            if (lastMessageUser) {
                                const unreadCount = await chatAPI.getUnreadMessagesCount(chatId) as unknown as { unread_count: number }
                                const messageName = lastMessageUser.display_name
                                    ? `${lastMessageUser.display_name}: `
                                    : `${lastMessageUser.first_name}: `

                                dialogItem.setProps({
                                    message: data.content,
                                    time: getMessageTime(data.time),
                                    count: unreadCount.unread_count,
                                    messageName,
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    public async deleteUserFromChat(chatId: number, userId: number) {
        await chatAPI.removeUser(chatId, userId)
    }
}

export const chatController = new ChatController()
