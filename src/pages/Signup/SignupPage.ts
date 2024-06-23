import { Block } from '@shared/lib/Block'
import { InputField } from '@shared/partials/InputField';
import { Input } from '@shared/partials/Input';
import { Button } from '@shared/partials/Button';
import { Link } from '@shared/partials';
import SigninPageTemplate from './SignupPage.hbs?raw';
import { ISignupPageProps } from './model';

export class SignupPage extends Block {
    constructor(props: ISignupPageProps) {
        super(props)
    }

    render() {
        return this.compile(SigninPageTemplate, this.props);
    }
}

const inputEmail = new InputField({
    className: 'login-page__input',
    id: 'email',
    label: 'Почта',
    input: new Input({
        type: 'email',
        id: 'email',
        name: 'email',
        className: 'input-field__element',
        value: 'pochta@yandex.ru',
    }),
})

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

const inputFirstName = new InputField({
    className: 'login-page__input',
    id: 'first_name',
    label: 'Имя',
    input: new Input({
        type: 'text',
        id: 'first_name',
        name: 'first_name',
        className: 'input-field__element',
        value: '',
    }),
})

const inputSecondName = new InputField({
    className: 'login-page__input',
    id: 'second_name',
    label: 'Фамилия',
    input: new Input({
        type: 'text',
        id: 'second_name',
        name: 'second_name',
        className: 'input-field__element',
        value: '',
    }),
})

const inputPhone = new InputField({
    className: 'login-page__input',
    id: 'phone',
    label: 'Телефон',
    input: new Input({
        type: 'tel',
        id: 'phone',
        name: 'phone',
        className: 'input-field__element',
        value: '',
    }),
})

const inputPassword = new InputField({
    className: 'login-page__input',
    id: 'password',
    error: ' ',
    label: 'Пароль',
    input: new Input({
        type: 'password',
        id: 'password',
        name: 'password',
        className: 'input-field__element',
        value: '123',
    }),
})

const inputPasswordRepeat = new InputField({
    className: 'login-page__input',
    id: 'password_repeat',
    error: 'Пароли не совпадают',
    label: 'Пароль (ещё раз)',
    input: new Input({
        type: 'password',
        id: 'password_repeat',
        name: 'password_repeat',
        className: 'input-field__element',
        value: '123',
    }),
})

const footerButtonSubmit = new Button({
    text: 'Зарегистрироваться',
    type: 'submit',
    className: 'login-form__submit-btn',
    events: {
        click: (e) => {
            e.preventDefault()
            window.location.hash = 'signin'
        },
    },
})

const footerLinkSignin = new Link({
    text: 'Войти',
    href: '#signin',
    className: 'login-form__link',
})

export const signupPage = new SignupPage({
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

// function render(query: string, block: Block) {
//     const root = document.querySelector(query)
//     root?.appendChild(block.getContent())
//     block.dispatchComponentDidMount()
//     return root;
// }

// setTimeout(() => {
//     render('#app', signupPage)
// }, 1)
