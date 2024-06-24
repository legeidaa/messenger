import { IBlockProps } from '@shared/lib/Block';
import { SigninForm } from 'widgets/SigninForm';

export interface ISigninPageProps extends IBlockProps {
    form: SigninForm
}
