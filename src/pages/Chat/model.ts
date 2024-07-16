import { IBlockProps } from '@shared/lib/Block/index.ts';
import { Button, Input, Link, Modal } from '@shared/partials/index.ts';
import { ChatMessages } from '@widgets/ChatMessages/index.ts';
import { DialogItem } from '@widgets/DialogItem/index.ts';

export interface IChatPageProps extends IBlockProps {
    dialogsHeaderLink: Link
    dialogsSearchInput: Input,
    dialogsFooter: Button,
    chatPlaceholder: boolean,
    dialogListItems: DialogItem[],
    chat: ChatMessages,
    modal: Modal
}
