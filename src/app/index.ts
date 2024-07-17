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


const button = document.createElement('button')
button.innerText = 'Logout'
button.addEventListener('click', () => {
    authAPI.logout()
})
document.body.prepend(button)

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

