import { IBlockProps } from '@shared/lib/Block';
import { Button, InputField } from 'shared/partials';

export interface IChangeAvatarModalProps extends IBlockProps {
    modalTitle: string
    fileInput: InputField | string,
    button: Button | null
    modalError?: string | null
}
