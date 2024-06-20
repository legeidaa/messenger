import './Button.scss'
import ButtonTemplate from './Button.hbs?raw';
import { Block } from '../../lib/Block';
import { IButtonProps } from './model';

export class Button extends Block {
    render() {
        return this.compile(ButtonTemplate, this.props);
    }

    componentDidMount(props?: object | undefined): void {
        // console.log('button mounted', props);
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        // console.log('button updated', oldProps, newProps);
        return true;
    }
}

// export const button = new Button({
//     text: 'Click',
//     type: 'button',
//     events: {
//         click: () => console.log('click'),
//     },
// })

// function render(query: string, block: Block) {
//     const root = document.querySelector(query)
//     root?.appendChild(block.getContent())
//     button.dispatchComponentDidMount()
//     return root;
// }

// setTimeout(() => {
//     render('#app', button);
// }, 1000)

// setTimeout(() => {
//     button.setProps({
//         text: 'Click me, please',
//         events: {
//             click: () => console.log('click 2'),
//         },
//     })
// }, 2000)

// setTimeout(() => {
//     button.setProps({
//         text: 'Click me, pleaseeeee',
//         events: {
//             click: () => console.log('click 3'),
//         },
//     })
// }, 3000)
