import { userAPI } from "@shared/api/UserApi";
import { store } from "@shared/Store";
import { addChatForm, addChatModal } from "@widgets/AddChatModal";
import { chatAPI } from "@shared/api/ChatApi";
import { ApiError } from "@shared/api/model";
import { User } from "@entities/User";
import { DialogItem } from "@widgets/DialogItem";
import { Avatar } from "@shared/partials";
import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'
import { avatarController } from "@shared/partials/Avatar";
import { getMessageTime } from "@shared/utils/getMessageTime";
import { state } from "@shared/Store/state";
import { chatMessages, chatPage } from "./ChatPage";
import { addUserForm, addUserModal } from "@widgets/AddUserModal";
import { WSTransport } from "@shared/lib/WSTransport";
import { authAPI } from "@shared/api/AuthApi";

export type ChatInfo = {
    id: number
}
class ChatPageController {
    public async getInitialData() {
        const userData = await authAPI.getUser()
        store.dispatch({ type: 'SET_USER', user: userData })
        chatPageController.getChats()
    }

    public async getChats(offset?: number, limit?: number, title?: string) {
        try {
            const chats = await chatAPI.getChats(offset, limit, title)
            store.dispatch({ type: 'SET_CHATS', chats })

            return true
        } catch (err) {
            const error = err as ApiError
            return error.reason
        }
    }

    public async addChat(e: Event) {
        e.preventDefault()
        const input = addChatForm.children.input.children.input
        const fileInput = addChatForm.children.fileInput.children.input.getContent() as HTMLInputElement
        addChatModal.setProps({ modalTitleError: false, modalTitle: "Добавить чат" })

        try {

            const chatInfo = await chatAPI.addChat(input.props.value as string) as unknown as ChatInfo // возвращает   {"id": 16399}

            const formData = new FormData()
            let chatAvatar
            if (fileInput.files) {
                if (fileInput.files.length) {
                    formData.append('avatar', fileInput.files[0])
                    formData.append('chatId', String(chatInfo.id))

                    chatAvatar = await chatAPI.addChatAvatar(formData)
                    fileInput.value = ''
                }
            }
            console.log(
                "Данные чата и юзера: ",
                chatInfo,
                chatAvatar
            );

            addChatModal.setProps({ modalTitle: "Чат добавлен" })
            input.props.value = ''

            this.getChats()

            return true

        } catch (err) {
            const error = err as ApiError

            if (err instanceof Error) {
                addChatModal.setProps({ modalTitleError: true, modalTitle: err.message })
                return err.message
            }
            addChatModal.setProps({ modalTitleError: true, modalTitle: error.reason })
            return error.reason
        }
    }

    public async deleteChat(e: Event) {
        e.preventDefault()

        const currentChat = store.getState().currentChat

        if (!currentChat) {
            return
        }

        try {
            const deletedChatInfo = await chatAPI.deleteChat(currentChat?.id)

            this.getChats()
            store.dispatch({ type: 'SET_CURRENT_CHAT', currentChat: null })
            chatPage.setProps({ dialogListItems: chatPageController.createDialogsList() })
            chatPage.setProps({ chatPlaceholder: true, })

            return deletedChatInfo
        } catch (err) {
            const error = err as ApiError
            return error.reason
        }
    }

    public async addUserToChat(e: Event) {
        e.preventDefault()
        addUserModal.setProps({ modalTitleError: false, modalTitle: "Добавить пользователя" })

        const input = addUserForm.children.input.children.input
        const currentChat = store.getState().currentChat

        if (currentChat) {
            try {

                const currentChatUsers = await chatAPI.getChatUsers(currentChat?.id) as unknown as Partial<User>[]

                console.log("currentChatUsers", currentChatUsers);

                if (currentChatUsers?.length) {
                    const user = currentChatUsers.filter(u => u.login === input.props.value)[0]
                    if (user) {
                        throw new Error('Пользователь уже есть в чате')
                    }
                }

                const users = await userAPI.searchUser(input.props.value as string) as unknown as User[] // возвращает массив совпадений по юзерам
                if (!users.length) {
                    throw new Error('Пользователь не найден')
                }
                const user = users.filter(u => u.login === input.props.value)[0]
                await chatAPI.addUser(currentChat.id, user.id as number)
                addUserModal.setProps({ modalTitle: "Пользователь добавлен" })

                const newChatUsers = await chatAPI.getChatUsers(currentChat?.id) as unknown as Partial<User>[]
                console.log("newChatUsers", newChatUsers);

                return true

            } catch (err) {
                const error = err as ApiError

                if (err instanceof Error) {
                    addUserModal.setProps({ modalTitleError: true, modalTitle: err.message })
                    return err.message
                }
                addUserModal.setProps({ modalTitleError: true, modalTitle: error.reason })
                return error.reason
            }
        }
        return false
    }

    public openDialog(dialogListItems: DialogItem[], dialogItem: DialogItem) {
        const currentChat = store.getState().currentChat
        console.log(currentChat);

        chatMessages.children.headerAvatar.setProps({
            src: avatarController.getAvatarSrc(currentChat?.avatar),
        })
        chatMessages.setProps({
            headerName: currentChat?.title
        })
        // TODO возможно стоит заменить на смену attr
        dialogListItems.forEach((dialogItem) => { dialogItem.setProps({ selected: false }) })
        dialogItem.setProps({ selected: true })
    }

    public async createMessagesConnection() {
        const user = store.getState().user
        const chats = store.getState().chats

        const connections = []
        if (user && chats) {
            chats.forEach(async (chat) => {

                const tokenData = await chatAPI.getChatToken(chat.id) as unknown as { token: string }
                console.log(tokenData, `wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${tokenData.token}`);

                const ws = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${tokenData.token}`)
                await ws.connect()
                // setTimeout(() => {
                //     ws.send({
                //         content: 'Моё первое сообщение миру!',
                //         type: 'message',
                //     });             
                // }, 1000)

                // ws.on('message', (data) => {
                //     console.log('message', data);
                // })

                connections.push({
                    [chat.id]: ws,
                })
                console.log(chats, chatPage.lists.dialogListItems );
            })
            // store.dispatch({ type: 'ADD_CHATS_CONNECTIONS', connections })
        }

    }

    public createDialogsList() {
        let dialogListItems: DialogItem[] = []

        const dialogs = store.getState().chats

        dialogs?.map((chat) => {

            let avatarSrc = avatarController.getAvatarSrc(chat.avatar)

            let dialogName = chat.title
            let lastMessage = ''
            let lastMessageTime = ''
            let messageName = ''

            if (chat.last_message) {
                lastMessage = chat.last_message.content
                lastMessageTime = getMessageTime(chat.last_message.time)

                if (chat.last_message.user.login === store.getState().user?.login) {
                    messageName = 'Вы: '
                } else {
                    messageName = chat.last_message.user.display_name
                        ? chat.last_message.user.display_name + ': '
                        : chat.last_message.user.first_name + ': '
                }
            }

            const dialogItem = new DialogItem({
                avatar: new Avatar({
                    src: avatarSrc
                }),
                name: dialogName,
                message: lastMessage,
                time: lastMessageTime,
                count: chat.unread_count,
                messageName,
                selected: false,
                events: {
                    click: (e) => {
                        e.preventDefault()
                        if (!dialogItem.props.selected) {
                            store.dispatch({ type: 'SET_CURRENT_CHAT', currentChat: chat })
                            this.openDialog(dialogListItems, dialogItem)
                        }
                    }
                }
            })
            dialogListItems.push(dialogItem)
        })

        return dialogListItems
    }
}

export const chatPageController = new ChatPageController()