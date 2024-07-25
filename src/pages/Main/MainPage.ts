import { Block } from '@shared/lib/Block/index.ts'
import { Link } from '@shared/partials/Link/index.ts';
import { router } from '@shared/lib/Router';
import { PagesPaths } from '@shared/lib/Router/model';
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
        new Link({
            href: PagesPaths.CHAT,
            text: 'Чат',
            events: {
                click: (e) => {
                    e.preventDefault()
                    router.go(PagesPaths.CHAT)
                },
            },
        }),
        new Link({
            href: PagesPaths.SIGNIN,
            text: 'Вход',
            events: {
                click: (e) => {
                    e.preventDefault()
                    router.go(PagesPaths.SIGNIN)
                },
            },
        }),
        new Link({
            href: PagesPaths.SIGNUP,
            text: 'Регистрация',
            events: {
                click: (e) => {
                    e.preventDefault()
                    router.go(PagesPaths.SIGNUP)
                },
            },
        }),
        new Link({
            href: PagesPaths.ERROR_CLIENT,
            text: '404 ошибка',
            events: {
                click: (e) => {
                    e.preventDefault()
                    router.go(PagesPaths.ERROR_CLIENT)
                },
            },
        }),
        new Link({
            href: PagesPaths.ERROR_SERVER,
            text: '500 ошибка',
            events: {
                click: (e) => {
                    e.preventDefault()
                    router.go(PagesPaths.ERROR_SERVER)
                },
            },
        }),
        new Link({
            href: PagesPaths.PROFILE,
            text: 'Профиль',
            events: {
                click: (e) => {
                    e.preventDefault()
                    router.go(PagesPaths.PROFILE)
                },
            },
        }),
    ],
})
