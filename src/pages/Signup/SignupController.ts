import { authAPI } from "@shared/api/AuthApi";
import { SignupFormData } from "./model";
import { store } from "@shared/Store";
import { validateSubmit } from "./validation";
import { inputEmail, inputFirstName, inputLogin, inputPassword, inputPhone, inputSecondName, signupForm } from "./SignupPage";
import { router } from "@shared/lib/Router";
import { PagesPaths } from "@shared/lib/Router/model";

interface LoginError {
    status: number,
    reason: string
}

class SignupController {

    public async signup(signupData: SignupFormData) {
        try {
            const res = await authAPI.signup({ data: signupData })
            console.log('Успешная регистрация');

            const userData = await authAPI.getUser()
            store.dispatch({ type: 'SET_USER', user: userData })

            return res
        } catch (err: unknown) {
            const error = err as LoginError
            return error.reason
        }
    }
    public async submit(e: Event) {
        if (validateSubmit(e)) {
            signupForm.props.error = ''
            const signupResult = await signupController.signup({
                first_name: inputFirstName.children.input.props.value as string,
                second_name: inputSecondName.children.input.props.value as string,
                login: inputLogin.children.input.props.value as string,
                email: inputEmail.children.input.props.value as string,
                phone: inputPhone.children.input.props.value as string,
                password: inputPassword.children.input.props.value as string,
            })

            console.log(signupResult);
            if (typeof signupResult === 'string') {
                signupForm.props.error = signupResult
            } else {
                router.go(PagesPaths.CHAT)
            }
        }
    }
}

export const signupController = new SignupController()