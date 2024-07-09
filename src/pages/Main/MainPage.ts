import { Block } from '@shared/lib/Block/index.ts'
import { Link } from '@shared/partials/Link/index.ts';
import MainPageTemplate from './MainPage.hbs?raw';

export class MainPage extends Block {
    render() {
        return this.compile(MainPageTemplate, this.props);
    }

    componentDidMount() {
        if (!this.firstRender) {
            const ol = document.querySelector('.mainpage-links')
            const links = ol?.querySelectorAll('a')
            links?.forEach((link) => {
                const wrapper = document.createElement('li')
                wrapper.append(link)
                ol?.append(wrapper)
            })
        }
        return true
    }
}

export const mainPage = new MainPage({
    links: [
        new Link({ href: '#chat', text: 'Чат' }),
        new Link({ href: '#signin', text: 'Вход' }),
        new Link({ href: '#signup', text: 'Регистрация' }),
        new Link({ href: '#error-client', text: '404 ошибка' }),
        new Link({ href: '#error-server', text: '500 ошибка' }),
        new Link({ href: '#profile', text: 'Профиль' }),
    ],
})
