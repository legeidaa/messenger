import '@/app/styles/style.scss'
import * as Pages from '@pages/index'
import { Block } from 'shared/lib/Block';
import { registerHelpers } from '../shared/helpers/index';

registerHelpers()

const app = document.querySelector('#app') as HTMLElement

enum PagesNames {
    MAIN = 'main',
    CHAT = 'chat',
    SIGNIN = 'signin',
    SIGNUP = 'signup',
    ERROR_CLIENT = 'error-client',
    ERROR_SERVER = 'error-server',
    PROFILE = 'profile',
}

type PagesType = {
    [key in PagesNames]: Block
}

const pages: PagesType = {
    [PagesNames.MAIN]: Pages.mainPage,
    [PagesNames.CHAT]: Pages.chatPage,
    [PagesNames.SIGNIN]: Pages.signinPage,
    [PagesNames.SIGNUP]: Pages.signupPage,
    [PagesNames.ERROR_CLIENT]: Pages.errorClientPage,
    [PagesNames.ERROR_SERVER]: Pages.errorServerPage,
    [PagesNames.PROFILE]: Pages.profilePage,
}

function render(root: HTMLElement, block: Block) {
    root?.appendChild(block.getContent())
    block.dispatchComponentDidMount()
    return root;
}

function navigate(page: PagesNames) {
    const pageBlock = pages[page]
    app.innerHTML = ''
    render(app, pageBlock)
}

function changePage() {
    const currentHash = window.location.hash.split('#')[1]
    if (`${window.location.origin}/` === window.location.href) {
        navigate(PagesNames.MAIN)
    }

    if (Object.keys(pages).includes(currentHash)) {
        navigate(currentHash as PagesNames)
    }
}
document.addEventListener('DOMContentLoaded', () => {
    changePage()
})

window.addEventListener('hashchange', () => {
    changePage()
})
