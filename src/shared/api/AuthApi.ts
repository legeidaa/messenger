
import { HTTPTransport, IMethodOptions } from '@shared/lib/HTTPTransport';
import { BaseURL } from './consts';

const authAPIInstance = new HTTPTransport(BaseURL);

// TODO сделать типы для data
class AuthAPI {
    public signup(options: IMethodOptions) {
        return authAPIInstance.post('/auth/signup', { ...options })
    }
    public signin(options: IMethodOptions) {
        
        return authAPIInstance.post('/auth/signin', { ...options })
    }
    public getUser() {
        console.log('get user');
        
        return authAPIInstance.get('/auth/user');
    }
    public logout() {
        return authAPIInstance.post('/auth/logout');
    }
}

export const authAPI = new AuthAPI()