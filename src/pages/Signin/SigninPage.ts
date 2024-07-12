import { Block, IBlockProps } from '@shared/lib/Block/index.ts'
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
// import { signinAPI } from '@shared/api/SigninApi.ts';
import { authAPI } from '@shared/api/AuthApi.ts';
import { signinController } from './SigninController.ts';
import { store, connect } from '@shared/Store';

class SigninPage extends Block {
    constructor(props: ISigninPageProps) {
        super(props)
    }

    render() {
        return this.compile(SigninPageTemplate, this.props);
    }

    componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
        console.log("signin componentDidUpdate", this, store.getState());

        if (oldProps.buttonText !== newProps.buttonText) {
            footerButtonSubmit.setProps({ text: newProps.buttonText })
        }
        return true
    }
}

const connectedSigninPage = connect(SigninPage, (state) => ({ buttonText: state.buttonText }))

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
            change: (e) => {
                // store.dispatch({ type: 'SET_TEXT', buttonText: e.target.value })
                // store.dispatch({ type: 'SET_SAMPLE_PROPS', sampleProps: 'New sample text' })
            }
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
            router.go(PagesPaths.SIGNUP)
        },
    },
})

const signinForm = new SigninForm({
    error: '',
    inputLogin,
    inputPassword,
    footerButtonSubmit,
    footerLinkSignup,
})

const form = new Form({
    formContent: signinForm,
    className: 'login-form login-form_signin',
    events: {
        submit: async (e) => {
            if (validateSubmit(e)) {
                signinForm.props.error = ''
                const signinResult = await signinController.signin({
                    // login: 'ligiza',
                    // password: "P@ssw0rd"
                    login: inputLogin.children.input.getContent().value as string,
                    password: inputPassword.children.input.getContent().value as string
                })

                console.log(signinResult);
                if (typeof signinResult === 'string') {
                    signinForm.props.error = signinResult
                } else {
                    router.go(PagesPaths.CHAT)
                }
            }
        },
    },
})

export const signinPage = new connectedSigninPage({
    form,
})
