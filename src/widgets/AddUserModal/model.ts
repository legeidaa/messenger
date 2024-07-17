import { IBlockProps } from '@shared/lib/Block';
import { AddUserForm } from 'widgets/AddChatForm';

export interface IAddUserModalProps extends IBlockProps {
    modalTitle: string,
    modalTitleError: boolean,
    addUserForm: AddUserForm
}
