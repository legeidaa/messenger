import { Block } from '@shared/lib/Block'
import { InputField } from '@shared/partials/InputField';
import { Input } from '@shared/partials/Input';
import { Button } from '@shared/partials/Button';
import { Link } from '@shared/partials';
import { SigninForm } from '@widgets/SigninForm';
import { Form } from '@shared/partials/Form';
import { validator } from '@shared/lib/Validator';
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
        events: {
            blur: validateLogin,
        },
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

function validateLogin(e: Event) {
    e.preventDefault()
    const input = inputLogin.children.input.getContent() as HTMLInputElement
    const result = validator.checkLogin(input.value)

    if (typeof result === 'string') {
        inputLogin.setProps({ error: result })
        return false
    }
    inputLogin.setProps({ error: '' })
    return true
}
function validatePassword(e: Event) {
    e.preventDefault()
    const input = inputPassword.children.input.getContent() as HTMLInputElement
    const result = validator.checkPassword(input.value)

    if (typeof result === 'string') {
        inputPassword.setProps({ error: result })
        return false
    }
    inputPassword.setProps({ error: '' })

    return true
}

function validateSubmit(e: Event) {
    e.preventDefault()

    if (validateLogin(e) && validatePassword(e)) {
        window.location.hash = 'chat'
    }
}

export const signinPage = new SigninPage({
    form,
})
