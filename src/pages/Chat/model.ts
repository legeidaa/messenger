import { IBlockProps } from '@shared/lib/Block';
import { Input, Link } from '@shared/partials';
import { ChatMessages } from '@widgets/ChatMessages';
import { DialogItem } from '@widgets/DialogItem';

export interface IChatPageProps extends IBlockProps {
    dialogsHeaderLink: Link
    dialogsSearchInput: Input,
    chatPlaceholder: boolean,
    dialogListItems: DialogItem[],
    chat: ChatMessages
}
