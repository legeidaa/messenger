import { IBlockProps } from '@shared/lib/Block/index.ts';
import { SignupForm } from '@widgets/SignupForm/index.ts';

export interface ISignupPageProps extends IBlockProps {
    form: SignupForm
}
