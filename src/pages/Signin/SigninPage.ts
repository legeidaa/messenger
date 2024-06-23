import { Block } from '@shared/lib/Block'
import { InputField } from '@shared/partials/InputField';
import { Input } from '@shared/partials/Input';
import { Button } from '@shared/partials/Button';
import { Link } from '@shared/partials';
import SigninPageTemplate from './SigninPage.hbs?raw';
import { ISigninPageProps } from './model';

export class SigninPage extends Block {
    constructor(props: ISigninPageProps) {
        super(props)
    }

    render() {
        return this.compile(SigninPageTemplate, this.props);
    }
}

const inputLogin = new InputField({
    className: 'login-page__input',
    id: 'login',
    label: 'Логин',
    input: new Input({
        type: 'text',
        id: 'login',
        name: 'login',
        className: 'input-field__element',
        value: 'somelogin',
    }),
})
const inputPassword = new InputField({
    className: 'login-page__input',
    id: 'password',
    error: 'Неверный логин или пароль',
    label: 'Пароль',
    input: new Input({
        type: 'password',
        id: 'password',
        name: 'password',
        className: 'input-field__element',
        value: '123',
    }),
})
const footerButtonSubmit = new Button({
    text: 'Вход',
    type: 'submit',
    className: 'login-form__submit-btn',
    events: {
        click: (e) => {
            e.preventDefault()
            window.location.hash = 'chat'
        },
    },
})
const footerLinkSignup = new Link({
    text: 'Нет аккаунта?',
    href: '#signup',
    className: 'login-form__link',
})

export const signinPage = new SigninPage({
    inputLogin,
    inputPassword,
    footerButtonSubmit,
    footerLinkSignup,
})
