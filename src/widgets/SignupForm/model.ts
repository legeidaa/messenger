import { IBlockProps } from '@shared/lib/Block';
import { InputField } from '@shared/partials/InputField';
import { Button } from '@shared/partials/Button';
import { Link } from '@shared/partials';

export interface ISignupFormProps extends IBlockProps {
    error: string,
    inputEmail: InputField;
    inputLogin: InputField;
    inputFirstName: InputField;
    inputSecondName: InputField;
    inputPhone: InputField;
    inputPassword: InputField;
    inputPasswordRepeat: InputField;
    footerButtonSubmit: Button;
    footerLinkSignin: Link
}
