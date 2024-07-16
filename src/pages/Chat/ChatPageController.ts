import { userAPI } from "@shared/api/UserApi";
import { store } from "@shared/Store";
import { addUserForm, addUserModal } from "@widgets/AddUserModal/AddUserModal";
import { chatAPI } from "@shared/api/ChatApi";
import { ApiError } from "@shared/api/model";
import { User } from "@entities/User";

export type ChatInfo = {
    id: number
}
class ChatPageController {

    public async getChats(offset?: number, limit?: number, title?: string) {
        try {
            const chats = await chatAPI.getChats(offset, limit, title)
            console.log(chats);

            // добавляем чаты в стор
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

            // const chatUsers = await chatAPI.getChatUsers(chatInfo.id)
            // обновляем список чатов
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
}

export const chatPageController = new ChatPageController()