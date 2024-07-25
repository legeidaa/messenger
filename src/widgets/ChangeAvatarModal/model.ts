import { IBlockProps } from '@shared/lib/Block';
import { ChangeAvatarForm } from 'widgets/ChangeAvatarForm';

export interface IChangeAvatarModalProps extends IBlockProps {
    modalTitle: string,
    modalTitleError: boolean,
    changeAvatarForm: ChangeAvatarForm
}
