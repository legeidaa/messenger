import { IBlockProps } from '@shared/lib/Block/index.ts';
import { SignupForm } from '@widgets/SignupForm/index.ts';

export type SignupFormData = {
    first_name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
    password_confirm?: string
}
export interface ISignupPageProps extends IBlockProps {
    form: SignupForm
}
