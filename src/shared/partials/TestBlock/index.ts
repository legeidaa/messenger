import * as Handlebars from 'handlebars';
import Block, { IProps } from '../../lib/Block';
import Test from './TestBlock.hbs?raw';
import { Button } from '../ButtonBlock';

interface ITestBlockProps extends IProps {
    userName: string;
    button: Block;
}

class TestBlock extends Block {
    constructor(props: ITestBlockProps) {
        super('div', props);
    }

    render() {
        return this.compile(Test, { userName: this.props.userName });
        // return Handlebars.compile(Test)(this.props)
    }

    componentDidMount(props?: object | undefined): void {
        console.log('test mounted');
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        console.log('test updated');
        return true;
    }
}
const btn = new Button({
    text: 'Click test block',
    type: 'button',
    events: {
        click: () => console.log('Click test block btn'),
    },
})
const testBlock = new TestBlock({
    userName: 'Данные',
    button: btn,
})

function render(query: string, block: Block) {
    const root = document.querySelector(query)
    root?.appendChild(block.getContent())
    testBlock.dispatchComponentDidMount()
    return root;
}

setTimeout(() => {
    render('#app', testBlock);
}, 1000)

setTimeout(() => {
    testBlock.setProps({
        userName: 'Данные изменились',
        button: btn.setProps({
            text: 'Click test block 2',
            events: {
                click: () => console.log('Click test block btn 2'),
            },
        }),
    })
}, 2000)
