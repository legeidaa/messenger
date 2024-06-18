import '@/app/styles/style.scss'
import * as Partials from '@partials/index'
import * as Pages from '@pages/index'
import * as Handlebars from 'handlebars'
import { ProfilePageArgs } from '@pages/Profile';
import { registerHelpers } from '../shared/helpers/index';
import { activateModals } from '../shared/utils';
import '../shared/partials/ButtonBlock/index.ts'

registerHelpers()

const app = document.querySelector('#app')

enum PagesNames {
    MAIN = 'main',
    CHAT = 'chat',
    SIGNIN = 'signin',
    SIGNUP = 'signup',
    ERROR_CLIENT = 'error-client',
    ERROR_SERVER = 'error-server',
    PROFILE = 'profile',
}

type PagesType = {
    [key in PagesNames]: any
}

const pages: PagesType = {
    [PagesNames.MAIN]: [Pages.MainPage],
    [PagesNames.CHAT]: [Pages.ChatPage],
    [PagesNames.SIGNIN]: [Pages.SigninPage],
    [PagesNames.SIGNUP]: [Pages.SignupPage],
    [PagesNames.ERROR_CLIENT]: [Pages.ErrorClientPage],
    [PagesNames.ERROR_SERVER]: [Pages.ErrorServerPage],
    [PagesNames.PROFILE]: [Pages.ProfilePage, ProfilePageArgs],
};

Object.entries(Partials).forEach(([name, partial]) => {
    Handlebars.registerPartial(name, partial as Handlebars.Template<any>)
})

function navigate(page: PagesNames) {
    const [source, args] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);

    if (app) {
        app.innerHTML = handlebarsFunct(args);
    }

    if (page === 'profile') {
        activateModals()
    }
}

// для превью первого спринта, логику не настраивал
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#' || window.location.hash === '') {
        navigate(PagesNames.MAIN)
    } else {
        const currentHash = window.location.hash.split('#')[1]
        if (currentHash in pages) {
            navigate(currentHash as PagesNames)
        }
    }

    document.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && e.target.classList.contains('login-form__submit-btn')) {
            e.preventDefault()
            window.location.hash = 'chat'
        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__link-data')) {
            e.preventDefault()
            const changedProfilePageArgs = { ...ProfilePageArgs }

            changedProfilePageArgs.canChangeData = true
            changedProfilePageArgs.showSaveButton = true

            const handlebarsFunct = Handlebars.compile(Pages.ProfilePage)
            if (app) {
                app.innerHTML = handlebarsFunct(changedProfilePageArgs)
            }
        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__link-password')) {
            e.preventDefault()
            const changedProfilePageArgs = { ...ProfilePageArgs }

            changedProfilePageArgs.canChangePassword = true
            changedProfilePageArgs.showSaveButton = true

            const handlebarsFunct = Handlebars.compile(Pages.ProfilePage)
            if (app) {
                app.innerHTML = handlebarsFunct(changedProfilePageArgs)
            }
        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__data-save')) {
            e.preventDefault()
            const changedProfilePageArgs = { ...ProfilePageArgs }

            changedProfilePageArgs.canChangePassword = false
            changedProfilePageArgs.canChangePassword = false

            const handlebarsFunct = Handlebars.compile(Pages.ProfilePage)
            if (app) {
                app.innerHTML = handlebarsFunct(changedProfilePageArgs)
            }
        }
    })
});

window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.split('#')[1]
    if (`${window.location.origin}/` === window.location.href) {
        navigate(PagesNames.MAIN)
    }

    if (Object.keys(pages).includes(currentHash)) {
        navigate(currentHash as PagesNames)
    }
})
