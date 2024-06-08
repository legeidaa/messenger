
import '@/app/styles/style.scss'
import * as Partials from '@partials/index'
import * as Pages from '@pages/index'
import * as Handlebars from 'handlebars'


const pages = {
    'main': [Pages.MainPage],
    'chat': [Pages.ChatPage],
    'signin': [Pages.SigninPage],
};

Object.entries(Partials).forEach(([name, partial]) => {
    Handlebars.registerPartial(name, partial as Handlebars.Template<any>)
})

function navigate(page) {
    const [source, args] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => {
    navigate('signin')
    window.location.hash = ''
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
