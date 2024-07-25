import { IBlockProps } from '@shared/lib/Block';
import { AddChatForm } from 'widgets/AddChatForm';

export interface IAddChatModalProps extends IBlockProps {
    modalTitle: string,
    modalTitleError: boolean,
    addUserForm: AddChatForm
}
