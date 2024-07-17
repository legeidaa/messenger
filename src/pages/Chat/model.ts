import { IBlockProps } from '@shared/lib/Block/index.ts';
import { Button, Input, Link, Modal } from '@shared/partials/index.ts';
import { ChatMessages } from '@widgets/ChatMessages/index.ts';
import { DialogItem } from '@widgets/DialogItem/index.ts';
import { Chat, Chats } from '@entities/Chat';
import { User } from '@entities/User';

export interface IChatPageProps extends IBlockProps {
    dialogsHeaderLink: Link
    dialogsSearchInput: Input,
    dialogsFooter: Button,
    chatPlaceholder: boolean,
    dialogListItems: DialogItem[],
    chat: ChatMessages,
    modals: Modal[]
}

export interface IChatPageState extends IChatPageProps {
    currentChat: Chat
    chats: Chats,
    user: User,
}