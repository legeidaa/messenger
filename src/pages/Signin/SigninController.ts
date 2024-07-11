import { authAPI } from "@shared/api/AuthApi";
import store from "@shared/Store/Store";

interface LoginError {
    status: number,
    reason: string
}

class SigninController {
    // до приватного роута
    // public async signin(signinData: { login: string, password: string }) {
    //     try {
    //         const data = await authAPI.getUser({ data: signinData });
    //         console.log('Данные о юзере получены (был ранее залогинен): ', data);
    //     } catch (err) {
    //         console.log('Пользователь не залогинен: ', err);
    //         await authAPI.signin({ data: signinData });

    //         console.log('Успешный логин', signinData);
    //         const data = await authAPI.getUser({ data: signinData });
    //     }
    // }

    // после приватного роута
    public async signin(signinData: { login: string, password: string }) {
        try {
            await authAPI.signin({ data: signinData })
            console.log('Успешный логин');
            // записываем данные о юзере в стор
            const userData = await authAPI.getUser({ data: signinData })
            store.dispatch({ type: 'SET_USER', user: userData })
            return true
        } catch (err: unknown) {
            const error = err as LoginError
            return error.reason
        }
    }
}

export const signinController = new SigninController()