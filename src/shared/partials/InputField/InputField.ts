import './InputField.scss'
import { Block } from '@shared/lib/Block';
import InputFieldTemplate from './InputField.hbs?raw';
import { IInputFieldProps } from './model';

export class InputField extends Block {
    constructor(props: IInputFieldProps) {
        super(props)
    }

    render() {
        return this.compile(InputFieldTemplate, this.props);
    }

    componentDidMount(props?: object | undefined): void {
        // console.log('button mounted', props);
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        return true;
    }
}