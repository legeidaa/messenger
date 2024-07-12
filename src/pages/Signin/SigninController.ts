import { authAPI } from "@shared/api/AuthApi";
import { store } from "@shared/Store";

interface LoginError {
    status: number,
    reason: string
}

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
            const error = err as LoginError
            return error.reason
        }
    }
}

export const signinController = new SigninController()