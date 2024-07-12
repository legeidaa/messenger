import { authAPI } from "@shared/api/AuthApi";
import { SignupFormData } from "./model";
import { store } from "@shared/Store";

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
}

export const signupController = new SignupController()