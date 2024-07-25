import { IBlockProps } from '@shared/lib/Block';
import { Avatar, Button } from '@shared/partials';
import { Message } from '@widgets/Message';
import { ChatDate } from 'shared/partials/ChatDate';
import { Form } from 'shared/partials/Form';

export interface IChatMessagesProps extends IBlockProps {
    headerAvatar: Avatar,
    headerName: string,
    headerButtons: Button[]
    messages: (Message | ChatDate)[],
    footerForm: Form
}
