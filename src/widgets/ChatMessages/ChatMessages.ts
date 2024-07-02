import { Block } from '@shared/lib/Block'
import ChatMessagesTemplate from './ChatMessages.hbs?raw';
import { IChatMessagesProps } from './model';

export class ChatMessages extends Block {
    constructor(props: IChatMessagesProps) {
        super(props)
    }

    render() {
        return this.compile(ChatMessagesTemplate, this.props);
    }
}
