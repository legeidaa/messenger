import './Button.scss'
import ButtonTemplate from './Button.hbs?raw';
import { Block } from '../../lib/Block';
import { IButtonProps } from './model';

export class Button extends Block {
    constructor(props: IButtonProps) {
        super(props)
    }

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
