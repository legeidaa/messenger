import { InputField } from '@shared/partials'

export function validateHelper(inputField: InputField, result: boolean | string) {
    if (typeof result === 'string') {
        inputField.setProps({ error: result })
        return false
    }
    inputField.setProps({ error: '' })
    return true
}
