import { Block } from '@shared/lib/Block'
import SigninFormTemplate from './SigninForm.hbs?raw';
import { ISigninFormProps } from './model';

export class SigninForm extends Block {
    constructor(props: ISigninFormProps) {
        super(props)
    }

    render() {
        return this.compile(SigninFormTemplate, this.props);
    }
}
