import { userAPI } from "@shared/api/UserApi";
import { store } from "@shared/Store";
import { addChatForm, addChatModal } from "@widgets/AddChatModal";
import { chatAPI } from "@shared/api/ChatApi";
import { ApiError } from "@shared/api/model";
import { User } from "@entities/User";
import { DialogItem } from "@widgets/DialogItem";
import { Avatar } from "@shared/partials";
import { avatarController } from "@shared/partials/Avatar";
import { getMessageTime } from "@shared/utils/getMessageTime";
import { state } from "@shared/Store/state";
import { chatMessages, chatPage, footerForm, footerSentBtn, footerTextarea, messages } from "./ChatPage";
import { addUserForm, addUserModal } from "@widgets/AddUserModal";
import { authAPI } from "@shared/api/AuthApi";
import { chatController, WSMessage, WSMessageData } from "@entities/Chat";
import { validateMessage } from "./validation";
import { Message } from "@widgets/Message";
import { ChatDate } from "@shared/partials/ChatDate";
import { WSTransportEvents } from "@shared/lib/WSTransport";

export type ChatInfo = {
    id: number
}
class ChatPageController {

    public messagesList: Message[] = []

    public async getInitialData() {
        const userData = await authAPI.getUser()
        store.dispatch({ type: 'SET_USER', user: userData })
        chatController.getChats()
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

            chatController.getChats()

            chatPageController.createDialogsList().then((dialogsList) => {
                chatPage.setProps({ dialogListItems: dialogsList })
            })

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

            chatController.getChats()
            
            store.dispatch({ type: 'SET_CURRENT_CHAT', currentChat: null })
            // chatPage.setProps({ dialogListItems: chatPageController.createDialogsList() })
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

    public updateMessages() {

    }

    public openDialog(dialogListItems: DialogItem[], dialogItem: DialogItem) {

        const currentChat = store.getState().currentChat
        const user = store.getState().user

        function scrollMessagesListToBottom() {
            const messagesScrollList = chatMessages.getContent().querySelector('.chat__messages')
            if (messagesScrollList) {
                setTimeout(() => {
                    messagesScrollList.scrollTop = 1000000
                    // console.log("messagesScrollList.scrollTop", messagesScrollList.scrollTop);
                })
            }
        }

        if (currentChat) {
            const connection = chatController.getConnectionById(currentChat.id)

            this.messagesList.length = 0

            connection?.send({
                content: '0',
                type: 'get old',
            })

            connection?.on(WSTransportEvents.MESSAGE, (data: WSMessageData[] | WSMessageData) => {
                // если получили список сообщений
                if (Array.isArray(data)) {
                    if (data.length && data[0].type === 'message') {
                        data.forEach((message) => {

                            this.messagesList.push(
                                new Message({
                                    text: message.content,
                                    time: getMessageTime(message.time),
                                    isOut: Number(message.user_id) === user?.id,
                                })
                            )
                        })
                        chatMessages.setProps({ messages: this.messagesList.reverse() })
                        scrollMessagesListToBottom()
                    }
                } else if (data.type === 'message' && Number(data.user_id) !== user?.id) {
                    // обновляем список только если пришло новое сообщение, а не отправили мы
                    this.messagesList.push(
                        new Message({
                            text: data.content,
                            time: getMessageTime(data.time),
                            isOut: Number(data.user_id) === user?.id,
                        })

                    )
                    chatMessages.setProps({ messages: this.messagesList })
                    scrollMessagesListToBottom()
                }

            })

            footerForm.props.events = {
                submit: (e: Event) => {
                    validateMessage(e)
                    if (validateMessage(e)) {
                        console.log(footerTextarea.props.value)

                        const data = new FormData(e.target as HTMLFormElement)
                        const formDataObj = Object.fromEntries(data.entries())
                        console.log(formDataObj)

                        connection?.send({
                            content: formDataObj.message,
                            type: 'message',
                        })

                        this.messagesList.push(
                            new Message({
                                text: formDataObj.message as string,
                                time: getMessageTime(new Date().toString()),
                                isOut: true,
                            })
                        )
                        chatMessages.setProps({ messages: this.messagesList })
                        scrollMessagesListToBottom()

                        footerTextarea.props.value = ''
                    }
                },
            }
        }

        chatMessages.children.headerAvatar.setProps({
            src: avatarController.getAvatarSrc(currentChat?.avatar),
        })
        chatMessages.setProps({
            headerName: currentChat?.title
        })
        // TODO возможно стоит заменить на смену attr
        dialogListItems.forEach((dialogItem) => { dialogItem.setProps({ selected: false }) })
        dialogItem.setProps({
            selected: true,
            count: 0
        })
    }

    public async createDialogsList() {
        let dialogListItems: DialogItem[] = []


        const user = store.getState().user
        const dialogs = store.getState().chats

        if (user && dialogs) {
            await chatController.createMessagesConnections(user, dialogs)

            dialogs.map((chat) => {

                let avatarSrc = avatarController.getAvatarSrc(chat.avatar)

                let dialogName = chat.title
                let lastMessage = ''
                let lastMessageTime = ''
                let messageName = ''

                if (chat.last_message) {
                    lastMessage = chat.last_message.content
                    lastMessageTime = getMessageTime(chat.last_message.time)

                    messageName = chat.last_message.user.display_name
                        ? chat.last_message.user.display_name + ': '
                        : chat.last_message.user.first_name + ': '
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

                chatController.updateDialogsListItem(chat, dialogItem)
                dialogListItems.push(dialogItem)
            })
            return dialogListItems
        }
        return new Error('Не удалось создать список диалогов')
    }
}

export const chatPageController = new ChatPageController()