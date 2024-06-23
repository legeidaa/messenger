import { Block } from '@shared/lib/Block'
import MessageTemplate from './Message.hbs?raw';
import { IMessageProps } from './model';

export class Message extends Block {
    constructor(props: IMessageProps) {
        super(props)
    }

    render() {
        return this.compile(MessageTemplate, this.props);
    }
}
