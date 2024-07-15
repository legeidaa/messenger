
import { IMethodOptions } from '@shared/lib/HTTPTransport';
import { Api } from './Api';
class AuthAPI extends Api {
    constructor() {
        super('/auth')
    }
    public signup(options: IMethodOptions) {
        return this.transport.post('/signup', { ...options })
    }
    public signin(options: IMethodOptions) {
        return this.transport.post('/signin', { ...options })
    }
    public getUser() {
        return this.transport.get('/user');
    }
    public logout() {
        return this.transport.post('/logout');
    }
}

export const authAPI = new AuthAPI()