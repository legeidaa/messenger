
export { default as MainPage } from './MainPage.hbs?raw';
import * as Handlebars from 'handlebars';

Handlebars.registerHelper('links-to-pages', () => {
    return [
        { link: '#chat', pageName: 'Чат', },
        { link: '#signin', pageName: 'Вход' },
        { link: '#signup', pageName: 'Регистрация' },
        { link: '#error-client', pageName: '404 ошибка' },
        { link: '#error-server', pageName: '500 ошибка' },
        { link: '#profile', pageName: 'Профиль' },
    ]
});
