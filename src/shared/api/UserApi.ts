
import { IMethodOptions } from '@shared/lib/HTTPTransport';
import { Api } from './Api';
class UserAPI extends Api{

    constructor() {
        super('/user')
    }
    public changeProfileData(options: IMethodOptions) {
        return this.transport.put('/profile', { ...options })
    }
    public changeProfileAvatar(options: IMethodOptions) {
        return this.transport.put('/profile/avatar', { ...options })
    }
    public changeProfilePassword(options: IMethodOptions) {
        return this.transport.put('/password', { ...options });
    }
    public searchUser(options: IMethodOptions) {
        return this.transport.post('/search', { ...options });
    }
}

export const userAPI = new UserAPI()