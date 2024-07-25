import { IBlockProps } from '@shared/lib/Block';
import { InputField } from '@shared/partials/InputField';
import { Button } from '@shared/partials/Button';

export interface IAddChatFormProps extends IBlockProps {
    input: InputField,
    fileInput: InputField,
    button: Button
}
