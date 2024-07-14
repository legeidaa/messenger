import { IBlockProps } from '@shared/lib/Block';
import { InputField } from '@shared/partials/InputField';
import { Button } from '@shared/partials/Button';

export interface IChangeAvatarFormProps extends IBlockProps {
    fileInput: InputField | string,
    button: Button | null
    modalError?: string | null
}
