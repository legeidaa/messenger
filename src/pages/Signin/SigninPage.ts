import { Block } from '@shared/lib/Block'
import { InputField } from '@shared/partials/InputField';
import { Input } from '@shared/partials/Input';
import { Button } from '@shared/partials/Button';
import { Link } from '@shared/partials';
import { SigninForm } from '@widgets/SigninForm';
import { Form } from '@shared/partials/Form';
import SigninPageTemplate from './SigninPage.hbs?raw';
import { ISigninPageProps } from './model';
import { validateLogin, validatePassword, validateSubmit } from './validation';

export class SigninPage extends Block {
    constructor(props: ISigninPageProps) {
        super(props)
    }

    render() {
        return this.compile(SigninPageTemplate, this.props);
    }
}

export const inputLogin = new InputField({
    className: 'login-page__input',
    id: 'login',
    label: 'Логин',
    input: new Input({
        type: 'text',
        id: 'login',
        name: 'login',
        className: 'input-field__element',
        value: 'somelogin',
        events: {
            blur: validateLogin,
        },
    }),
})
export const inputPassword = new InputField({
    className: 'login-page__input',
    id: 'password',
    label: 'Пароль',
    input: new Input({
        type: 'password',
        id: 'password',
        name: 'password',
        className: 'input-field__element',
        value: '123',
        events: {
            blur: validatePassword,
        },
    }),
})
const footerButtonSubmit = new Button({
    text: 'Вход',
    type: 'submit',
    className: 'login-form__submit-btn',
})
const footerLinkSignup = new Link({
    text: 'Нет аккаунта?',
    href: '#signup',
    className: 'login-form__link',
})

const signinForm = new SigninForm({
    inputLogin,
    inputPassword,
    footerButtonSubmit,
    footerLinkSignup,
})

const form = new Form({
    formContent: signinForm,
    className: 'login-form login-form_signin',
    events: {
        submit: (e) => {
            validateSubmit(e)
        },
    },
})

export const signinPage = new SigninPage({
    form,
})
