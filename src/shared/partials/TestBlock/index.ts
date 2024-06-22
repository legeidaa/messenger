/* eslint-disable max-classes-per-file */
import { Block, IBlockProps } from '../../lib/Block';
import Test from './TestBlock.hbs?raw';
import ChatTemplate from './ChatItem.hbs?raw';
import { Button } from '../ButtonBlock';
import { Input } from '../InputBlock';
import { InputField } from '../InputFieldBlock';

interface ITestBlockProps extends IBlockProps {
    userName: string;
    button: Block;
}

class TestBlock extends Block {
    render() {
        // return this.compile(Test, { userName: this.props.userName })
        return this.compile(Test, this.props)
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

const inputBlock1 = new Input({
    type: 'text',
    id: 'input',
    title: 'Input',
    name: 'input',
    className: 'input-field__element',
    value: 'Input',
})

const inputField1 = new InputField({
    className: 'input-field1',
    error: '',
    placeholder: 'Input field',
    id: 'input-field1',
    label: 'Input field',
    input: inputBlock1,
})

const inputBlock2 = new Input({
    type: 'text',
    id: 'input2',
    title: 'Input',
    name: 'input',
    className: 'input-field__element',
    value: 'Input2',
})

const inputField2 = new InputField({
    className: 'input-field2',
    error: '',
    placeholder: 'Input field',
    id: 'input-field2',
    label: 'Input field',
    input: inputBlock2,
})

const testBlock = new TestBlock({
    userName: 'Данные',
    button: btn,
    // input: inputBlock,
    inputField1,
    inputField2,
    lists: [
        new Input({
            type: 'text',
            id: 'input2',
            title: 'Input',
            name: 'input',
            className: 'input-field__element',
            value: 'Input2',
        }),
        new Input({
            type: 'text',
            id: 'input2',
            title: 'Input',
            name: 'input',
            className: 'input-field__element',
            value: 'Input2',
        }),
    ],
    // lists: [
    //     new ChatItem({ name: 'Samanta Smith', message: 'Алло, на!' }),
    //     new ChatItem({ name: 'John Dow 1', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 2', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 3', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 4', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 5', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 6', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow', message: 'What?' }),
    //     new ChatItem({ name: 'Samanta Smith', message: 'Алло, на!' }),
    //     new ChatItem({ name: 'John Dow 1', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 2', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 3', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 4', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 5', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow 6', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow', message: 'What?' }),
    //     new ChatItem({ name: 'John Dow', message: 'What?' }),
    // ],
})

function render(query: string, block: Block) {
    const root = document.querySelector(query)
    root?.appendChild(block.getContent())
    block.dispatchComponentDidMount()
    return root;
}

setTimeout(() => {
    render('#app', testBlock);
}, 1000)

setTimeout(() => {
    // testBlock.setProps({
    //     userName: 'Данные изменились',
    //     button: btn.setProps({
    //         text: 'Click test block 2',
    //         events: {
    //             click: () => console.log('Click test block btn 2'),
    //         },
    //     }),
    //     input: inputBlock.setProps({
    //         value: 'Input 2',
    //     }),

    // })
    // inputBlock.setProps({
    //     value: 'Input 2',
    // })
    inputBlock2.setProps({
        attr: {
            value: 'fake',
        },
    })
    inputField1.setProps({
        label: 'Input field label changed',

        error: 'asdasdads',
    })
}, 5000)
