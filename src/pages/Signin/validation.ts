import { validator } from '@shared/lib/Validator.ts'
import { validateHelper } from '@shared/utils/validateHelper.ts'
import { inputLogin, inputPassword } from './SigninPage.ts'

export function validateLogin(e: Event) {
    e.preventDefault()
    const input = inputLogin.children.input.getContent() as HTMLInputElement
    const result = validator.checkLogin(input.value)

    return validateHelper(inputLogin, result)
}

export function validatePassword(e: Event) {
    e.preventDefault()
    const input = inputPassword.children.input.getContent() as HTMLInputElement
    const result = validator.checkPassword(input.value)

    return validateHelper(inputPassword, result)
}

export function validateSubmit(e: Event) {
    const data = new FormData(e.target as HTMLFormElement)
    const formDataObj = Object.fromEntries(data.entries())
    console.log(formDataObj)

    e.preventDefault()

    validateLogin(e)
    validatePassword(e)

    if (validateLogin(e) && validatePassword(e)) {
        // router.go(PagesPaths.CHAT)
        return true
    }
    return false
}
