import { Block } from '@shared/lib/Block/index.ts'
import { InputField } from '@shared/partials/InputField/index.ts';
import { Input } from '@shared/partials/Input/index.ts';
import { Button } from '@shared/partials/Button/index.ts';
import { Link } from '@shared/partials/index.ts';
import { SignupForm } from '@widgets/SignupForm/index.ts';
import { Form } from '@shared/partials/Form/index.ts';
import { router } from '@shared/lib/Router/Router.ts';
import { PagesPaths } from '@shared/lib/Router/model';
import SigninPageTemplate from './SignupPage.hbs?raw';
import { ISignupPageProps } from './model.ts';
import { validateComparePassword, validateEmail, validateLogin, validateName, validatePassword, validatePhone, validateSecondName, validateSubmit } from './validation.ts';
import { signupController } from './SignupController.ts';

export class SignupPage extends Block {
    constructor(props: ISignupPageProps) {
        super(props)
    }

    render() {
        return this.compile(SigninPageTemplate, this.props);
    }
}

export const inputEmail = new InputField({
    className: 'login-page__input',
    id: 'email',
    label: 'Почта',
    input: new Input({
        type: 'email',
        id: 'email',
        name: 'email',
        className: 'input-field__element',
        value: 'pochta@yandex.ru',
        events: {
            blur: validateEmail,
        },
    }),
})

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

export const inputFirstName = new InputField({
    className: 'login-page__input',
    id: 'first_name',
    label: 'Имя',
    input: new Input({
        type: 'text',
        id: 'first_name',
        name: 'first_name',
        className: 'input-field__element',
        value: 'Иван',
        events: {
            blur: validateName,
        },
    }),
})

export const inputSecondName = new InputField({
    className: 'login-page__input',
    id: 'second_name',
    label: 'Фамилия',
    input: new Input({
        type: 'text',
        id: 'second_name',
        name: 'second_name',
        className: 'input-field__element',
        value: 'Иванов',
        events: {
            blur: validateSecondName,
        },
    }),
})

export const inputPhone = new InputField({
    className: 'login-page__input',
    id: 'phone',
    label: 'Телефон',
    input: new Input({
        type: 'tel',
        id: 'phone',
        name: 'phone',
        className: 'input-field__element',
        value: '1234567890',
        events: {
            blur: validatePhone,
        },
    }),
})

export const inputPassword = new InputField({
    className: 'login-page__input',
    id: 'password',
    error: '',
    label: 'Пароль',
    input: new Input({
        type: 'password',
        id: 'password',
        name: 'password',
        className: 'input-field__element',
        // value: '123',
        value: 'asdfghj1A',
        events: {
            blur: (e: Event) => {
                validatePassword(e)
                validateComparePassword()
            },
        },
    }),
})

export const inputPasswordRepeat = new InputField({
    className: 'login-page__input',
    id: 'password_repeat',
    // error: 'Пароли не совпадают',
    label: 'Пароль (ещё раз)',
    input: new Input({
        type: 'password',
        id: 'password_repeat',
        name: 'password_repeat',
        className: 'input-field__element',
        // value: '123',
        value: 'asdfghj1A',
        events: {
            blur: validateComparePassword,
        },
    }),
})

const footerButtonSubmit = new Button({
    text: 'Зарегистрироваться',
    type: 'submit',
    className: 'login-form__submit-btn',
})

const footerLinkSignin = new Link({
    text: 'Войти',
    href: PagesPaths.SIGNIN,
    className: 'login-form__link',
    events: {
        click: (e) => {
            e.preventDefault()
            router.go(PagesPaths.SIGNIN)
        },
    },
})

const signupForm = new SignupForm({
    error: '',
    inputEmail,
    inputLogin,
    inputFirstName,
    inputSecondName,
    inputPhone,
    inputPassword,
    inputPasswordRepeat,
    footerButtonSubmit,
    footerLinkSignin,
})

const form = new Form({
    formContent: signupForm,
    className: 'login-form login-form_signup',
    events: {
        submit: async (e) => {
            // validateSubmit(e)
            if (validateSubmit(e)) {
                signupForm.props.error = ''
                const signupResult = await signupController.signup({
                    first_name: "Артурт",
                    second_name: "Морган",
                    login: `ligiza1`,
                    email: `ligiza1@mail.com`,
                    phone: "+71234567890",
                    password: "p@ssw0rd",
                })

                console.log(signupResult);
                if (typeof signupResult === 'string') {
                    signupForm.props.error = signupResult
                } else {
                    router.go(PagesPaths.CHAT)
                }
            }
        },
    },
})

export const signupPage = new SignupPage({
    form,
})
