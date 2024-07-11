import { authAPI } from "@shared/api/AuthApi";
import { SignupFormData } from "./model";

interface LoginError {
    status: number,
    reason: string
}

class SignupController {

    public async signup(signupData: SignupFormData) {
        try {
            const res = await authAPI.signup({ data: signupData })
            console.log('Успешная регистрация');
            // записываем данные о юзере в стор
            // await authAPI.getUser({ data: signinData });
            console.log(res);

            // возвращается айди, нужно ли в стор записывать?
            return res
        } catch (err: unknown) {
            const error = err as LoginError
            return error.reason
        }
    }
}

export const signupController = new SignupController()