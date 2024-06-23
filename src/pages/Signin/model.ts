import { IBlockProps } from '@shared/lib/Block';
import { InputField } from '@shared/partials/InputField';
import { Button } from '@shared/partials/Button';
import { Link } from '@shared/partials';

export interface ISigninPageProps extends IBlockProps {
    inputLogin: InputField;
    inputPassword: InputField;
    footerButtonSubmit: Button;
    footerLinkSignup: Link
}
