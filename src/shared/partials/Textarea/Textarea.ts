import './Textarea.scss'
import TextareaTemplate from './Textarea.hbs?raw';
import { Block } from '../../lib/Block';
import { ITextareaProps } from './model';

export class Textarea extends Block {
    constructor(props: ITextareaProps) {
        super(props);
    }

    render() {
        return this.compile(TextareaTemplate, this.props);
    }

    componentDidMount(props?: object | undefined): void {
    }

    componentDidUpdate(oldProps: object, newProps: object): boolean {
        return true;
    }
}
