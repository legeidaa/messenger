import FormTemplate from './Form.hbs?raw';
import { Block } from '../../lib/Block';
import { IFormProps } from './model';

export class Form extends Block {
    constructor(props: IFormProps) {
        super(props)
    }

    render() {
        return this.compile(FormTemplate, this.props);
    }

    componentDidMount(props?: object | undefined): void {
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        return true;
    }
}
