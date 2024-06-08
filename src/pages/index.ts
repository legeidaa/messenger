export { MainPage } from './Main/index';
export { ChatPage } from './Chat/index';
export { SigninPage } from './Signin/index';



document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && e.target.classList.contains('login-form__submit-btn')) {
            e.preventDefault()
            window.location.hash = 'chat'
        }
    })
})
