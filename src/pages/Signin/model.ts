import { IBlockProps } from '@shared/lib/Block/index.ts';
import { SigninForm } from '@widgets/SigninForm/index.ts';

export type SigninFormData = {
    login: string
    password: string
}
export interface ISigninPageProps extends IBlockProps {
    form: SigninForm
}
