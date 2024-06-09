
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

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.hash === '#' || window.location.hash === '') {
        navigate('main')
    }
    navigate(window.location.hash.split('#')[1])
    // window.location.hash = ''
});

window.addEventListener("hashchange", function (e) {
    const hash = window.location.hash.split('#')[1]
    if(window.location.origin + '/' === window.location.href) {
        navigate('main')
    }

    if (Object.keys(pages).includes(hash)) {
        navigate(hash)
    }
});

//вынести login-form в widgets