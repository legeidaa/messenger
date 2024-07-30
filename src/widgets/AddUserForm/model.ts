import { IBlockProps } from '@shared/lib/Block';
import { InputField } from '@shared/partials/InputField';
import { Button } from '@shared/partials/Button';

export interface IAddUserFormProps extends IBlockProps {
    input: InputField,
    button: Button
}
