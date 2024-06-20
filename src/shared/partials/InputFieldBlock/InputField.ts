import './InputField.scss'
import InputFieldTemplate from './InputField.hbs?raw';
import { Block } from '../../lib/Block';
import { IInputFieldProps } from './model';

export class InputField extends Block {
    render() {
        return this.compile(InputFieldTemplate, this.props);
    }

    componentDidMount(props?: object | undefined): void {
        // console.log('button mounted', props);
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        console.log('InputField updated', oldProps, newProps);
        return true;
    }
}
