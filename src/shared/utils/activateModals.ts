import { fadeIn, fadeOut } from './transitionFunctions';

export function activateModals() {
    const modals = document.querySelectorAll('.modal')
    const modalTriggers = document.querySelectorAll('[data-modal]')
    const modalActiveClass = 'modal_opened'

    modalTriggers.forEach((trigger) => {
        const modalType = trigger.getAttribute('data-modal')
        const modal = document.querySelector(`[data-modal-type="${modalType}"`)

        trigger.addEventListener('click', (e) => {
            e.preventDefault()
            fadeIn(modal as HTMLElement, 'block', 250, modalActiveClass)
        })
    })

    modals.forEach((modal) => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                e.stopPropagation()
                e.preventDefault()
                fadeOut(modal as HTMLElement, 250, modalActiveClass)
            }
        })
    })
}
