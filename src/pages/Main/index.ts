import * as Handlebars from 'handlebars';

export { default as MainPage } from './MainPage.hbs?raw';

Handlebars.registerHelper('links-to-pages', () => [
    { link: '#chat', pageName: 'Чат' },
    { link: '#signin', pageName: 'Вход' },
    { link: '#signup', pageName: 'Регистрация' },
    { link: '#error-client', pageName: '404 ошибка' },
    { link: '#error-server', pageName: '500 ошибка' },
    { link: '#profile', pageName: 'Профиль' },
]);
