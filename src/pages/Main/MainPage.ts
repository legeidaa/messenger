import { Block, IBlockProps } from '@shared/lib/Block'
import { Link } from '@shared/partials/Link';
import MainPageTemplate from './MainPage.hbs?raw';

export class MainPage extends Block {
    render() {
        return this.compile(MainPageTemplate, this.props);
    }

    componentDidMount(props: IBlockProps): void {
        if (!this.firstRender) {
            const ol = document.querySelector('.mainpage-links')
            const links = ol?.querySelectorAll('a')
            links?.forEach((link) => {
                const wrapper = document.createElement('li')
                wrapper.append(link)
                ol?.append(wrapper)
            })
        }
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
