
import '@/app/styles/style.scss'
import * as Partials from '@partials/index'
import * as Pages from '@pages/index'
import * as Handlebars from 'handlebars'
import { registerHelpers } from '../shared/helpers/index';
import { ProfilePageArgs } from '@pages/Profile';
import { activateModals } from '../shared/utils';

registerHelpers()

const pages = {
    'main': [Pages.MainPage],
    'chat': [Pages.ChatPage],
    'signin': [Pages.SigninPage],
    'signup': [Pages.SignupPage],
    'error-client': [Pages.ErrorClientPage],
    'error-server': [Pages.ErrorServerPage],
    'profile': [Pages.ProfilePage, ProfilePageArgs],
};

Object.entries(Partials).forEach(([name, partial]) => {
    Handlebars.registerPartial(name, partial as Handlebars.Template<any>)
})

function navigate(page) {
    const [source, args] = pages[page];

    const handlebarsFunct = Handlebars.compile(source);
    document.querySelector('#app').innerHTML = handlebarsFunct(args);

    if (page === 'profile') {
        activateModals()
    }
}


// для превью первого спринта, логику не настраивал
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#' || window.location.hash === '') {
        navigate('main')
    } else {
        navigate(window.location.hash.split('#')[1])
    }

    // activateModals()

    document.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && e.target.classList.contains('login-form__submit-btn')) {
            e.preventDefault()
            window.location.hash = 'chat'
        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__link-data')) {
            e.preventDefault()
            let changedProfilePageArgs = { ...ProfilePageArgs }

            changedProfilePageArgs.canChangeData = true
            changedProfilePageArgs.showSaveButton = true

            const handlebarsFunct = Handlebars.compile(Pages.ProfilePage)
            document.querySelector('#app').innerHTML = handlebarsFunct(changedProfilePageArgs)

        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__link-password')) {
            e.preventDefault()
            let changedProfilePageArgs = { ...ProfilePageArgs }

            changedProfilePageArgs.canChangePassword = true
            changedProfilePageArgs.showSaveButton = true

            const handlebarsFunct = Handlebars.compile(Pages.ProfilePage)
            document.querySelector('#app').innerHTML = handlebarsFunct(changedProfilePageArgs)
        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__data-save')) {
            e.preventDefault()
            let changedProfilePageArgs = { ...ProfilePageArgs }

            changedProfilePageArgs.canChangePassword = false
            changedProfilePageArgs.canChangePassword = false

            const handlebarsFunct = Handlebars.compile(Pages.ProfilePage)
            document.querySelector('#app').innerHTML = handlebarsFunct(changedProfilePageArgs)
        }
    })

});

window.addEventListener("hashchange", function (e) {
    const hash = window.location.hash.split('#')[1]
    if (window.location.origin + '/' === window.location.href) {
        navigate('main')
    }

    if (Object.keys(pages).includes(hash)) {
        navigate(hash)
    }
});
