import { IBlockProps } from '@shared/lib/Block';
import { AddUserForm } from '@widgets/AddUserForm';

export interface IAddUserModalProps extends IBlockProps {
    modalTitle: string,
    modalTitleError: boolean,
    addUserForm: AddUserForm
}
