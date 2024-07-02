export function fadeIn(el: HTMLElement, display: string, timeout: number, activeClass: string) {
    el.style.opacity = '0';
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.classList.add(activeClass)
    })
}

export function fadeOut(el: HTMLElement, timeout: number, activeClass: string) {
    el.style.opacity = '1';
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = '0';

    setTimeout(() => {
        el.style.display = 'none';
        el.classList.remove(activeClass)
    }, timeout);
}
