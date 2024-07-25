import { Block, IBlockProps } from '@shared/lib/Block/index.ts'
import { InputField } from '@shared/partials/InputField/index.ts';
import { Input } from '@shared/partials/Input/index.ts';
import { Button } from '@shared/partials/Button/index.ts';
import { Link } from '@shared/partials/index.ts';
import { SigninForm } from '@widgets/SigninForm/index.ts';
import { Form } from '@shared/partials/Form/index.ts';
import { router } from '@shared/lib/Router/Router.ts';
import { PagesPaths } from '@shared/lib/Router/model';
import { store, connect } from '@shared/Store';
import SigninPageTemplate from './SigninPage.hbs?raw';
import { ISigninPageProps } from './model.ts';
import { validateLogin, validatePassword } from './validation.ts';
import { signinController } from './SigninController.ts';

class SigninPage extends Block {
    constructor(props: ISigninPageProps) {
        super(props)
    }

    render() {
        return this.compile(SigninPageTemplate, this.props);
    }

    componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
        console.log('signin componentDidUpdate', this, store.getState());

        if (oldProps.buttonText !== newProps.buttonText) {
            footerButtonSubmit.setProps({ text: newProps.buttonText })
        }
        return true
    }
}

const ConnectedSigninPage = connect(SigninPage, (state) => ({ buttonText: state.buttonText }))

export const inputLogin = new InputField({
    className: 'login-page__input',
    id: 'login',
    label: 'Логин',
    input: new Input({
        type: 'text',
        id: 'login',
        name: 'login',
        className: 'input-field__element',
        value: 'legeida',
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
        value: 'Aa123456',
        events: {
            blur: validatePassword,
        },
    }),
})

export const footerButtonSubmit = new Button({
    text: 'Вход',
    type: 'submit',
    className: 'login-form__submit-btn',
})

export const footerLinkSignup = new Link({
    text: 'Нет аккаунта?',
    href: PagesPaths.SIGNUP,
    className: 'login-form__link',
    events: {
        click: (e) => {
            e.preventDefault()
            router.go(PagesPaths.SIGNUP)
        },
    },
})

export const signinForm = new SigninForm({
    error: '',
    inputLogin,
    inputPassword,
    footerButtonSubmit,
    footerLinkSignup,
})

export const form = new Form({
    formContent: signinForm,
    className: 'login-form login-form_signin',
    events: {
        submit: async (e) => {
            signinController.submit(e)
        },
    },
})

export const signinPage = new ConnectedSigninPage({
    form,
})
