// import './chat-page.scss';
import * as Handlebars from 'handlebars'
export { default as ChatPage } from './ChatPage.hbs?raw';
import img from '../../shared/assets/badger_1.png'

Handlebars.registerHelper('chat-page-list', () => {
    return [
        { name: 'Опоссум', message: 'Изображение', unread: '2', avatar: img },
        { name: 'Енот', message: 'Go на свалку!' },
        { name: 'Барсук', message: 'А у кого ключи от сарая?', unread: '4' },
    ]
});
