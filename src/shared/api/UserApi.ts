
import { HTTPTransport, IMethodOptions } from '@shared/lib/HTTPTransport';
import { BaseURL } from './consts';

const userAPIInstance = new HTTPTransport(BaseURL);

class UserAPI {
    public changeProfileData(options: IMethodOptions) {
        return userAPIInstance.put('/user/profile', { ...options })
    }
    public changeProfileAvatar(options: IMethodOptions) {
        return userAPIInstance.put('/user/profile/avatar', { ...options })
    }
    public changeProfilePassword(options: IMethodOptions) {
        return userAPIInstance.put('/user/password', { ...options });
    }
    public searchUser(options: IMethodOptions) {
        return userAPIInstance.post('/user/search', { ...options });
    }
}

export const userAPI = new UserAPI()