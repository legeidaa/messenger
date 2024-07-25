import '@/app/styles/style.scss'
import * as Pages from '@pages/index.ts'
import { router } from '@shared/lib/Router';
import { PagesPaths } from '@shared/lib/Router/model';
import { store } from '@shared/Store';
import { authAPI } from '@shared/api/AuthApi';
router
    .use(PagesPaths.SIGNIN, Pages.signinPage)
    .use(PagesPaths.MAIN, Pages.mainPage)
    .use(PagesPaths.SIGNUP, Pages.signupPage)
    .use(PagesPaths.PROFILE, Pages.profilePage)
    .use(PagesPaths.ERROR_CLIENT, Pages.errorClientPage)
    .use(PagesPaths.ERROR_SERVER, Pages.errorServerPage)
    .use(PagesPaths.CHAT, Pages.chatPage)
    .start()


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const userData = await authAPI.getUser()
        console.log('Данные юзера получены');
        store.dispatch({ type: 'SET_USER', user: userData })

    } catch (error) {
        console.log('Данные юзера не получены', error);

        router.go(PagesPaths.SIGNIN)
    }
})






function unzip(...args: Array<unknown[]>) {

    let maxLength = 0

    args.forEach(arg => {
        if (!Array.isArray(arg)) {
            throw new Error(`${arg} is not array`)
        }

        if (arg.length > maxLength) {
            maxLength = arg.length
        }
    })

    let result: Array<unknown[]> = Array(args.length).fill([])
    
    // console.log(args);
    
    args.forEach((arg, i) => {
        for (let j = 0; j < maxLength; j++) {
            // console.log(arg, j, arg[j], );

            console.log("result:",result[i], i);
            
            
            result[i].push(arg[j])
        }
    })
    return result
}
export default unzip

/**
    * unzip([1, 2, 3], [4], [5, 6]); // => 
    * [
    * [1, 4, 5], 
    * [2, undefined, 6], 
    * [3, undefined, undefined]
    * ]
    * unzip([1, 2, 3]); // => [[1], [2], [3]]
    * unzip([1], [1, 2, 3], [4, 6, 7, 8, 9]); // => [[1, 1, 4], [undefined, 2, 6], [undefined, 3, 7], [undefined, undefined, 8], [undefined, undefined, 9]]
    * unzip({}); // => Error: [object Object] is not array
*/

console.log(unzip([1, 2, 3], [4], [5, 6]));
// console.log(unzip([1, 2, 3]));
// console.log(unzip([1], [1, 2, 3], [4, 6, 7, 8, 9]));
// console.log(unzip({}));
