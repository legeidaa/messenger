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

const testBlock = new TestBlock({
    userName: 'Test Block text',
    button: new Button({
        text: 'Click test block',
        type: 'button',
        events: {
            click: () => console.log('clickkkkkk'),
        },
    }),
    // events: {
    //     // click: () => console.log('Test click'),
    // },
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
        userName: 'Test Block text 2',
        // events: {
        //     click: () => console.log('Test click 2'),
        // },
    })
}, 2000)
