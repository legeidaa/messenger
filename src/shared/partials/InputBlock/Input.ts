import './Input.scss'
import InputTemplate from './Input.hbs?raw';
import { Block } from '../../lib/Block';
import { IInputProps } from './model';

export class Input extends Block {
    render() {
        return this.compile(InputTemplate, this.props);
    }

    componentDidMount(props?: object | undefined): void {
        // console.log('button mounted', props);
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        console.log('input updated', oldProps, newProps);
        return true;
    }
}
