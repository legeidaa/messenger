import { userAPI } from "@shared/api/UserApi";
import { store } from "@shared/Store";
import { addUserForm, addUserModal } from "@widgets/AddUserModal/AddUserModal";
import { chatAPI } from "@shared/api/ChatApi";
import { ApiError } from "@shared/api/model";
import { User } from "@entities/User";
import { DialogItem } from "@widgets/DialogItem";
import { Avatar } from "@shared/partials";
import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'
import { avatarController } from "@shared/partials/Avatar";
import { getMessageTime } from "@shared/utils/getMessageTime";
import { state } from "@shared/Store/state";

export type ChatInfo = {
    id: number
}
class ChatPageController {

    public async getChats(offset?: number, limit?: number, title?: string) {
        try {
            const chats = await chatAPI.getChats(offset, limit, title)
            store.dispatch({ type: 'SET_CHATS', chats })
            // console.log("store", store.getState());
            return true
        } catch (err) {
            const error = err as ApiError
            return error.reason
        }
    }

    public async addChat(e: Event) {
        e.preventDefault()
        const input = addUserForm.children.input.children.input
        const chats = store.getState().chats
        addUserModal.setProps({ modalTitleError: false, modalTitle: "Добавить пользователя" })

        try {
            if (chats?.length) {
                const chat = chats.filter(c => c.title === input.props.value)[0]
                if (chat) {
                    throw new Error('Чат с пользователем уже существует')
                }
            }

            const users = await userAPI.searchUser(input.props.value as string) as unknown as User[] // возвращает массив совпадений по юзерам
            if (!users.length) {
                throw new Error('Пользователь не найден')
            }
            const user = users.filter(u => u.login === input.props.value)[0]

            const chatInfo = await chatAPI.addChat(input.props.value as string) as unknown as ChatInfo // возвращает   {"id": 16399}
            console.log(
                "Данные чата и юзера: ",
                chatInfo,
                users,
            );

            await chatAPI.addUser(chatInfo.id, user.id as number)
            addUserModal.setProps({ modalTitle: "Чат добавлен" })

            this.getChats()

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

    public createDialogsList() {
        let dialogListItems: DialogItem[] = []
        
        // console.log(store.getState());
        
        store.getState().chats?.map((chat) => {
            
            let avatarSrc = avatarSkeletonSrc
            let dialogName = chat.title
            let lastMessage = ''
            let lastMessageTime = ''
            let messageByYou = false

            if (chat.last_message) {
        
                avatarSrc = avatarController.getAvatarSrc(chat.last_message.user.avatar)
                dialogName = chat.last_message.user.display_name
                    ? chat.last_message.user.display_name
                    : chat.last_message.user.first_name + ' ' + chat.last_message.user.second_name
                lastMessage = chat.last_message.content
                lastMessageTime = getMessageTime(chat.last_message.time)

                if (chat.last_message.user.login === store.getState().user?.login) {
                    messageByYou = true
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
                messageByYou,
                selected: false,
                events: {
                    click: (e) => {
                        e.preventDefault()
                        if (!dialogItem.props.selected) {
                            store.dispatch({ type: 'SET_CURRENT_CHAT', currentChat: chat })

                            // TODO возможно стоит заменить на смену attr
                            dialogListItems.forEach((dialogItem) => { dialogItem.setProps({ selected: false }) })
                            dialogItem.setProps({ selected: true })    
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