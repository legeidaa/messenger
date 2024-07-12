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
            console.log(res, typeof res);
            // type Res = {
            //     id: number
            // }
            // const data: Res = JSON.parse(res)
            // возвращается айди, нужно ли в стор записывать?
            store.dispatch({ type: 'SET_ID', id: res.id })
            return res
        } catch (err: unknown) {
            const error = err as LoginError
            return error.reason
        }
    }
}

export const signupController = new SignupController()