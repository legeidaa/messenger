import { ProfilePageArgs } from './Profile/index';
import { ProfilePage } from './Profile/index';
import * as Handlebars from 'handlebars'

export { MainPage } from './Main/index';
export { ChatPage } from './Chat/index';
export { SigninPage } from './Signin/index';
export { SignupPage } from './Signup/index';
export { ErrorClientPage } from './ErrorClient/index';
export { ErrorServerPage } from './ErrorServer/index';
export { ProfilePage } from './Profile/index';




// для превью первого спринта, логику не настраивал
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && e.target.classList.contains('login-form__submit-btn')) {
            e.preventDefault()
            window.location.hash = 'chat'
        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__link-data')) {
            e.preventDefault()
            let changedProfilePageArgs  = {...ProfilePageArgs}
            
            changedProfilePageArgs.canChangeData = true
            changedProfilePageArgs.showSaveButton = true

            const handlebarsFunct = Handlebars.compile(ProfilePage)
            document.querySelector('#app').innerHTML = handlebarsFunct(changedProfilePageArgs)

        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__link-password')) {
            e.preventDefault()
            let changedProfilePageArgs  = {...ProfilePageArgs}
            
            changedProfilePageArgs.canChangePassword = true
            changedProfilePageArgs.showSaveButton = true

            const handlebarsFunct = Handlebars.compile(ProfilePage)
            document.querySelector('#app').innerHTML = handlebarsFunct(changedProfilePageArgs)
        }

        if (e.target instanceof HTMLElement && e.target.classList.contains('profile__data-save')) {
            e.preventDefault()
            let changedProfilePageArgs  = {...ProfilePageArgs}

            changedProfilePageArgs.canChangePassword = false
            changedProfilePageArgs.canChangePassword = false

            const handlebarsFunct = Handlebars.compile(ProfilePage)
            document.querySelector('#app').innerHTML = handlebarsFunct(changedProfilePageArgs)
        }
    })
})
