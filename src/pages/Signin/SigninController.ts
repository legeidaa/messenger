import { authAPI } from "@shared/api/AuthApi";
import { store } from "@shared/Store";
import { validateSubmit } from "./validation";
import { inputLogin, inputPassword, signinForm } from "./SigninPage";
import { router } from "@shared/lib/Router";
import { PagesPaths } from "@shared/lib/Router/model";
import { ApiError } from "@shared/api/model";

class SigninController {
    // после приватного роута
    public async signin(signinData: { login: string, password: string }) {
        try {
            await authAPI.signin({ data: signinData })
            console.log('Успешный логин');

            const userData = await authAPI.getUser()
            store.dispatch({ type: 'SET_USER', user: userData })

            return true
        } catch (err: unknown) {
            const error = err as ApiError
            return error.reason
        }
    }

    public async submit(e: Event) {
        e.preventDefault()
        if (validateSubmit(e)) {
            signinForm.props.error = ''

            const signinResult = await signinController.signin({
                login: inputLogin.children.input.props.value as string,
                password: inputPassword.children.input.props.value as string
            })

            // console.log(signinResult);
            if (typeof signinResult === 'string') {
                signinForm.props.error = signinResult
            } else {
                router.go(PagesPaths.CHAT)
            }
        }
    }
}

export const signinController = new SigninController()