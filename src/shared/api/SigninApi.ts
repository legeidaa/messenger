
import { HTTPTransport } from '@shared/lib/HTTPTransport';

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');
// const chatAPIInstance = new HTTPTransport('https://jsonplaceholder.typicode.com');

class SigninAPI {
    // post() {
    //     return chatAPIInstance.post('/posts', {
    //         data: {
    //             title: 'foo',
    //             body: 'bar',
    //             userId: 1,
    //         }
    //     });

    // }
    signup() {
        return chatAPIInstance.post('/auth/signup', { data: {
            first_name: "a",
            second_name: "a",
            login: `ligiza`,
            email: `a.morgan@rdr2.com2`,
            phone: "+71234567890",
            password: "P@ssw0rd", // Грустный и слабый пароль, можно вот так: oPKzos*1X$uKz$ta
          }}).then((res) => console.log(res))
    }
    signin() {
        return chatAPIInstance.post('/auth/signin', { data: { login: 'ligiza', password: "P@ssw0rd" } })
    }
    get() {
        return chatAPIInstance.get('/auth/user', { data: { login: 'ligiza', password: "P@ssw0rd" } });
    }
    logout() {
        return chatAPIInstance.post('/auth/logout');
    }
}

export const signinAPI = new SigninAPI()