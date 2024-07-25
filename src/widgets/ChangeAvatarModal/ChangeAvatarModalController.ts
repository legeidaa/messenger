import { userAPI } from '@shared/api/UserApi';
import { store } from '@shared/Store';
import { ApiError } from 'shared/api/model';
import { changeAvatarForm, changeAvatarModal, fileInput } from './ChangeAvatarModal';

class ChangeAvatarModalController {
    public async sendAvatar(e: Event) {
        e.preventDefault()
        const input = fileInput.children.input.getContent() as HTMLInputElement
        const formData = new FormData()
        if (input.files) {
            if (!input.files.length) {
                changeAvatarForm.setProps({ modalError: 'Выберите файл' })
                return
            }

            formData.append('avatar', input.files[0])
        }
        changeAvatarModal.setProps({ modalTitleError: false, modalTitle: 'Загрузите файл' })
        changeAvatarForm.setProps({ modalError: '' })

        try {
            const userData = await userAPI.changeProfileAvatar({ data: formData })
            store.dispatch({ type: 'SET_USER', user: userData })
            changeAvatarModal.setProps({ modalTitle: 'Файл загружен' })

            return true
        } catch (err) {
            const error = err as ApiError

            changeAvatarModal.setProps({ modalTitleError: true, modalTitle: error.reason })
            return error.reason
        }
    }
}

export const changeAvatarModalController = new ChangeAvatarModalController()
