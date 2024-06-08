
import Handlebars from 'handlebars'
import * as Partials from './partials'
import * as Pages from './pages'

const pages = {
    'main': [Pages.MainPage],
    'chat': [Pages.ChatPage],
    'login': [Pages.LoginPage],
};

Object.entries(Partials).forEach(([name, partial]) => {
    Handlebars.registerPartial(name, partial)
})

function navigate(page) {
    const [source, args] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => {
    navigate('main')
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
