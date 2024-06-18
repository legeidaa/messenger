import * as Handlebars from 'handlebars';
import Block from '../../lib/Block';
import './Button.scss'
import ButtonTemplate from './Button.hbs?raw';

interface IButtonProps {
    text: string;
    type: string;
    className?: string;
    href?: string;
}

// TODO передавать в класс темплейт (вместо элемента)
class Button extends Block {
    constructor(props: IButtonProps) {
        super('div', props);
    }

    render() {
        return Handlebars.compile(ButtonTemplate)(this.props);
    }

    componentDidMount(props?: object | undefined): void {
        console.log('button mounted', props);
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        console.log('button updated', oldProps, newProps);
        return true;
    }
}

export const button = new Button({
    text: 'Click',
    type: 'button',
})

function render(query: string, block: Block) {
    const root = document.querySelector(query)
    root?.appendChild(block.getContent())
    return root;
}

render('.app', button);
setTimeout(() => {
    render('#app', button);
    button.dispatchComponentDidMount()
}, 1000)

setTimeout(() => {
    button.setProps({
        text: 'Click me, please',
    })
}, 2000)
