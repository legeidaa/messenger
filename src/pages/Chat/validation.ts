import { validator } from '@shared/lib/Validator'
import { footerForm } from './ChatPage'

export function validateMessage(e: Event) {
    e.preventDefault()
    const textareaComponent = footerForm.children.formContent.children.footerTextarea
    const textarea = textareaComponent.getContent() as HTMLTextAreaElement
    const result = validator.checkMessage(textarea.value)

    if (typeof result === 'string') {
        textareaComponent.setProps({
            placeholder: 'Сообщение не должно быть пустым',
            value: '',
        })
        return false
    }
    textareaComponent.setProps({
        placeholder: 'Сообщение',
        value: textarea.value,
    })
    return true
}
