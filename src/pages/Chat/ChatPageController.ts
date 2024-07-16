import { userAPI } from "@shared/api/UserApi";
import { store } from "@shared/Store";
import { addUserForm, addUserModal } from "@widgets/AddUserModal/AddUserModal";
import { chatAPI } from "@shared/api/ChatApi";
import { ApiError } from "@shared/api/model";
import { User } from "@entities/User";
import { DialogItem } from "@widgets/DialogItem";
import { Avatar } from "@shared/partials";
import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'

export type ChatInfo = {
    id: number
}
class ChatPageController {

    public async getChats(offset?: number, limit?: number, title?: string) {
        try {
            const chats = await chatAPI.getChats(offset, limit, title)
            store.dispatch({ type: 'SET_CHATS', chats })
            console.log("store", store.getState());
            return true
        } catch (err) {
            const error = err as ApiError
            return error.reason
        }
    }

    public async addChat(e: Event) {
        e.preventDefault()
        const input = addUserForm.children.input.children.input
        addUserModal.setProps({ modalTitleError: false, modalTitle: "Добавить пользователя" })

        try {

            // TODO сделать проерку на уже существующий с этим юзером чат

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
            addUserModal.setProps({  modalTitle: "Чат добавлен" })

            // const chatUsers = await chatAPI.getChatUsers(chatInfo.id)
            // TODO обновляем список чатов

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

        store.getState().chats?.map((chat) => {
            // chat.
            const dialogItem = new DialogItem({
                avatar: new Avatar({
                    src: avatarSkeletonSrc // или chat.last_message.user.avatar
                }),
                name: chat.title, // или chat.last_message.user.first_name
                message: 'Привет, как дела?',
                time: '12:00',
                count: 2,
                messageByYou: false,
                selected: false,
            })

            dialogListItems.push(dialogItem)
        })
        return dialogListItems
    }
}

export const chatPageController = new ChatPageController()