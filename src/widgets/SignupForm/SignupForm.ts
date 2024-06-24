import { Block } from '@shared/lib/Block'
import SignupFormTemplate from './SignupForm.hbs?raw';
import { ISignupFormProps } from './model';

export class SignupForm extends Block {
    constructor(props: ISignupFormProps) {
        super(props)
    }

    render() {
        return this.compile(SignupFormTemplate, this.props);
    }
}
