import './Textarea.scss'
import TextareaTemplate from './Textarea.hbs?raw';
import { Block } from '../../lib/Block';
import { ITextareaProps } from './model';

export class Textarea extends Block {
    constructor(props: ITextareaProps) {
        super({
            ...props,
            events: {
                change: (e) => {
                    const target = e.target as HTMLInputElement
                    this.setProps({ value: target?.value })
                },
            }
        });
    }

    render() {
        return this.compile(TextareaTemplate, this.props);
    }
}
