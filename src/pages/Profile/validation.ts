import { validator } from '@shared/lib/Validator.ts'
import { ProfileDataRow } from '@shared/partials/index.ts'
import { loginRow, mailRow, nameRow, newPasswordRow, phoneRow, repeatNewPasswordRow, secondNameRow } from './ProfilePage.ts'

function validateHelper(inputField: ProfileDataRow, result: boolean | string, standartLabel: string) {
    if (typeof result === 'string') {
        inputField.setProps({ label: result })
        return false
    }
    inputField.setProps({ label: standartLabel })
    return true
}

export function validateEmail(e: Event) {
    e.preventDefault()
    const input = mailRow.children.input.getContent() as HTMLInputElement
    const result = validator.checkEmail(input.value)

    return validateHelper(mailRow, result, 'Почта')
}

export function validateLogin(e: Event) {
    e.preventDefault()
    const input = loginRow.children.input.getContent() as HTMLInputElement
    const result = validator.checkLogin(input.value)

    return validateHelper(loginRow, result, 'Логин')
}

export function validateName(e: Event) {
    e.preventDefault()

    const input = nameRow.children.input.getContent() as HTMLInputElement
    const result = validator.checkName(input.value)

    return validateHelper(nameRow, result, 'Имя')
}

export function validateSecondName(e: Event) {
    e.preventDefault()
    const input = secondNameRow.children.input.getContent() as HTMLInputElement
    const result = validator.checkName(input.value)

    return validateHelper(secondNameRow, result, 'Фамилия')
}

export function validatePhone(e: Event) {
    e.preventDefault()
    const input = phoneRow.children.input.getContent() as HTMLInputElement
    const result = validator.checkPhone(input.value)

    return validateHelper(phoneRow, result, 'Телефон')
}
export function validatePassword(e: Event, row: ProfileDataRow, label: string) {
    e.preventDefault()
    const input = row.children.input.getContent() as HTMLInputElement
    const result = validator.checkPassword(input.value)

    return validateHelper(row, result, label)
}

export function validateComparePassword(e: Event) {
    e.preventDefault()
    const passInput = newPasswordRow.children.input.getContent() as HTMLInputElement
    const passInputRepeat = repeatNewPasswordRow.children.input.getContent() as HTMLInputElement

    const result = validator.comparePasswords(passInput.value, passInputRepeat.value)

    return validateHelper(repeatNewPasswordRow, result, 'Повторите пароль')
}
