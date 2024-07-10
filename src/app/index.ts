import '@/app/styles/style.scss'
import * as Pages from '@pages/index.ts'
import { router } from '@shared/lib/Router';
import { PagesPaths } from '@shared/lib/Router/model';

router
    .use(PagesPaths.SIGNIN, Pages.signinPage)
    .use(PagesPaths.MAIN, Pages.mainPage)
    .use(PagesPaths.SIGNUP, Pages.signupPage)
    .use(PagesPaths.PROFILE, Pages.profilePage)
    .use(PagesPaths.ERROR_CLIENT, Pages.errorClientPage)
    .use(PagesPaths.ERROR_SERVER, Pages.errorServerPage)
    .use(PagesPaths.CHAT, Pages.chatPage)
    .start()
