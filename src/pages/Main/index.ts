
export { default as MainPage } from './MainPage.hbs?raw';
import * as Handlebars from 'handlebars';

Handlebars.registerHelper('links-to-pages', () => {
    return [
        { link: '#chat', pageName: 'Чат', },
        { link: '#signin', pageName: 'Вход' },
    ]
});