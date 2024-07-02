class Validator {
    private patterns: {
        [key: string]: RegExp
    }

    constructor() {
        this.patterns = {
            notOnlyDigits: /(?!^\d+$)^.+$/,
            name: /^[A-Z | А-Я][a-zA-Zа-яА-Я-]+$/,
            login: /^[a-z0-9_-]{3,20}$/,
            email: /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]+)$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
            phone: /^\+?[0-9]{10,15}$/,
            message: /^(?!\s*$).+/,
        }
    }

    private _validationResult(result: boolean, message: string): boolean | string {
        return result ? true : message
    }

    checkName(value: string): boolean | string {
        const result = this.patterns.name.test(value)
        return this._validationResult(result, 'Некорректное имя')
    }

    checkLogin(value: string): boolean | string {
        const result = this.patterns.login.test(value) && this.patterns.notOnlyDigits.test(value)
        return this._validationResult(result, 'Некорректный логин')
    }

    checkEmail(value: string): boolean | string {
        const result = this.patterns.email.test(value)
        return this._validationResult(result, 'Некорректная почта')
    }

    checkPhone(value: string): boolean | string {
        const result = this.patterns.phone.test(value)
        return this._validationResult(result, 'Некорректный телефон')
    }

    checkPassword(value: string): boolean | string {
        const result = this.patterns.password.test(value)
        return this._validationResult(result, 'Некорректный пароль')
    }

    checkMessage(value: string): boolean | string {
        const result = this.patterns.message.test(value)
        return this._validationResult(result, 'Сообщение не может быть пустым')
    }

    comparePasswords(pass1: string, pass2: string): boolean | string {
        const result = pass1 === pass2
        return this._validationResult(result, 'Пароли не совпадают')
    }
}

export const validator = new Validator()
