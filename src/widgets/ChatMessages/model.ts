import { IBlockProps } from '@shared/lib/Block';
import { Avatar, Button, InputField } from '@shared/partials';
import { Message } from '@widgets/Message';
import { ChatDate } from 'shared/partials/ChatDate';

export interface IChatMessagesProps extends IBlockProps {
    headerAvatar: Avatar,
    headerName: string,
    headerButton: Button
    messages: (Message | ChatDate)[],
    footerAttachInput: InputField,
    footerSentBtn: Button,
}
