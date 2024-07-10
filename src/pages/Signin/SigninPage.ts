import { Block } from '@shared/lib/Block/index.ts'
import { InputField } from '@shared/partials/InputField/index.ts';
import { Input } from '@shared/partials/Input/index.ts';
import { Button } from '@shared/partials/Button/index.ts';
import { Link } from '@shared/partials/index.ts';
import { SigninForm } from '@widgets/SigninForm/index.ts';
import { Form } from '@shared/partials/Form/index.ts';
import { router } from '@shared/lib/Router/Router.ts';
import { PagesPaths } from '@shared/lib/Router/model';
import SigninPageTemplate from './SigninPage.hbs?raw';
import { ISigninPageProps } from './model.ts';
import { validateLogin, validatePassword, validateSubmit } from './validation.ts';
import { signinAPI } from '@shared/api/SigninApi.ts';

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
        value: 'Abcde123A',
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
    href: PagesPaths.SIGNUP,
    className: 'login-form__link',
    events: {
        click: (e) => {
            e.preventDefault()
            // router.go(PagesPaths.SIGNUP)

            // signinAPI.logout()
            // signinAPI.signin()
            signinAPI.get()
        },
    },
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
