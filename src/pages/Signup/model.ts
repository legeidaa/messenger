import { IBlockProps } from '@shared/lib/Block';
import { SignupForm } from '@widgets/SignupForm';

export interface ISignupPageProps extends IBlockProps {
    form: SignupForm
}
