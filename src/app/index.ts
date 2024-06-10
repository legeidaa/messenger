
import '@/app/styles/style.scss'
import * as Partials from '@partials/index'
import * as Pages from '@pages/index'
import * as Handlebars from 'handlebars'
import { registerHelpers } from '../shared/helpers/index';
import { ProfilePageArgs } from '@pages/Profile';
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

console.log(pages);

function navigate(page) {
    const [source, args] = pages[page];

    const handlebarsFunct = Handlebars.compile(source);
    document.querySelector('#app').innerHTML = handlebarsFunct(args);
}


// для превью первого спринта, логику не настраивал
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#' || window.location.hash === '') {
        navigate('main')
    }
    navigate(window.location.hash.split('#')[1])

    function fadeIn(el, display, timeout, activeClass) {

        el.style.opacity = 0;
        el.style.display = display || 'block';
        el.style.transition = `opacity ${timeout}ms`;
        requestAnimationFrame(() => {
            el.style.opacity = 1;
            el.classList.add(activeClass)
        })
    }

    function fadeOut(el, timeout, activeClass) {
        el.style.opacity = 1;
        el.style.transition = `opacity ${timeout}ms`;
        el.style.opacity = 0;

        setTimeout(() => {
            el.style.display = 'none';
            el.classList.remove(activeClass)
        }, timeout);
    }

    function activateModals() {
        const modals = document.querySelectorAll('.modal')
        const modalTriggers = document.querySelectorAll('[data-modal]')
        const modalActiveClass = 'modal_opened'
        console.log(modalTriggers, modals);


        modalTriggers.forEach(trigger => {

            const modalType = trigger.getAttribute('data-modal')
            const modal = document.querySelector(`[data-modal-type="${modalType}"`)

            trigger.addEventListener('click', (e) => {
                e.preventDefault()

                fadeIn(modal, 'block', 250, modalActiveClass)
            })
        })

        modals.forEach(modal => {

            modal.addEventListener('click', e => {
                if (e.target === modal) {
                    e.stopPropagation()
                    e.preventDefault()
                    fadeOut(modal, 250, modalActiveClass)
                }
            })
        })
    }
    activateModals()

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

//вынести login-form в widgets