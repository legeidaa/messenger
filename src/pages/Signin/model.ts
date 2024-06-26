import { IBlockProps } from '@shared/lib/Block/index.ts';
import { SigninForm } from '@widgets/SigninForm/index.ts';

export interface ISigninPageProps extends IBlockProps {
    form: SigninForm
}
