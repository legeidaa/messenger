
import { userAPI } from "@shared/api/UserApi";
import { changeDataRow, changePasswordRow, displayNameRow, exitRow, form, loginRow, mailRow, nameRow, newPasswordRow, oldPasswordRow, phoneRow, profileDataInfo, profileDataPass, profilePage, repeatNewPasswordRow, saveButton, secondNameRow } from "./ProfilePage";
import { IProfilePageState } from "./model";
import { validateDataFields, validatePasswordFields, } from "./validation";
import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'
import { store } from "@shared/Store";
import { ApiError } from "shared/api/model";

class ProfileController {

    public setProfileFields(oldProps: IProfilePageState, newProps: IProfilePageState) {
        if (newProps.user) {
            if (oldProps.user.email !== newProps.user.email) {
                mailRow.children.input.setProps({ value: newProps.user.email })
            }
            if (oldProps.user.login !== newProps.user.login) {
                loginRow.children.input.setProps({ value: newProps.user.login })
            }
            if (oldProps.user.first_name !== newProps.user.first_name) {
                nameRow.children.input.setProps({ value: newProps.user.first_name })
                profilePage.setProps({ profileName: newProps.user.first_name })
            }
            if (oldProps.user.second_name !== newProps.user.second_name) {
                secondNameRow.children.input.setProps({ value: newProps.user.second_name })
            }
            if (oldProps.user.display_name !== newProps.user.display_name) {
                displayNameRow.children.input.setProps({ value: newProps.user.display_name })
            }
            if (oldProps.user.phone !== newProps.user.phone) {
                phoneRow.children.input.setProps({ value: newProps.user.phone })
            }
        }
    }

    public changeFieldsToProfileData() {
        profileDataInfo.forEach((row) => {
            row.children.input.setProps({
                readonly: false,
            })
        })
        const newProfileFooterContent = [
            saveButton,
        ]
        form.setProps({
            canChangeData: true,
        })
        profilePage.setProps({
            profileFooter: newProfileFooterContent,
        })
    }

    public changeFieldsToProfilePassword() {
        const newProfileFooterContent = [
            saveButton,
        ]
        form.setProps({
            formContent: profileDataPass,
            canChangePassword: true,
        })
        profilePage.setProps({
            profileFooter: newProfileFooterContent,
        })
    }

    private async changeProfileData() {
        try {
            const newUserData = await userAPI.changeProfileData({
                data: {
                    first_name: nameRow.children.input.props.value,
                    second_name: secondNameRow.children.input.props.value,
                    display_name: displayNameRow.children.input.props.value,
                    login: loginRow.children.input.props.value,
                    email: mailRow.children.input.props.value,
                    phone: phoneRow.children.input.props.value,
                }
            })
            console.log('Успешная смена данных профиля', newUserData);

            store.dispatch({ type: 'SET_USER', user: newUserData })
            return true

        } catch (e) {
            console.log('Ошибка при смене данных профиля', e);
            const error = e as ApiError
            return error.reason
        }
    }

    private async changePassword() {
        try {
            await userAPI.changeProfilePassword({
                data: {
                    oldPassword: oldPasswordRow.children.input.props.value,
                    newPassword: newPasswordRow.children.input.props.value,
                }
            })
            console.log('Успешная смена пароля');
            return true
        } catch (e) {
            console.log('Ошибка при смене пароля', e);
            const error = e as ApiError
            return error.reason
        }
    }

    public async saveData(e: Event) {
        if (form.props.canChangePassword && validatePasswordFields(e) === false) {
            return
        } else {
            const passwordResult = await this.changePassword()
            if (typeof passwordResult === 'string') {
                profilePage.setProps({ profileFooterError: passwordResult })
                return
            }

            oldPasswordRow.children.input.props.value = '***'
            newPasswordRow.children.input.props.value = '****'
            repeatNewPasswordRow.children.input.props.value = '****'
        }

        if (form.props.canChangeData && validateDataFields(e) === false) {
            return
        } else {
            const dataResult = await this.changeProfileData()
            if (typeof dataResult === 'string') {
                profilePage.setProps({ profileFooterError: dataResult })
                return
            }
        }

        profileDataInfo.forEach((row) => {
            row.children.input.setProps({
                readonly: true,
            })
        })
        const newProfileFooterContent = [
            changeDataRow,
            changePasswordRow,
            exitRow,
        ]

        form.setProps({
            formContent: profileDataInfo,
            canChangePassword: false,
            canChangeData: false,
        })
        profilePage.setProps({
            profileFooter: newProfileFooterContent,
            profileFooterError: '',
        })
    }

    public getAvatarSrc(): string {
        if (store.getState().user?.avatar) {
            return store.getState().user?.avatar as string
        } else {
            return avatarSkeletonSrc
        }
    }
}

export const profileController = new ProfileController()