import './Input.scss'
import InputTemplate from './Input.hbs?raw';
import { Block } from '../../lib/Block';
import { IInputProps } from './model';

export class Input extends Block {
    constructor(props: IInputProps) {
        super(props)
    }

    render() {
        return this.compile(InputTemplate, this.props);
    }

    componentDidMount(props?: object | undefined): void {
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        return true;
    }
}
