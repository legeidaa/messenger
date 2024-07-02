import { Block } from '@shared/lib/Block'
import ChatDateTemplate from './ChatDate.hbs?raw';
import { IChatDateProps } from './model';

export class ChatDate extends Block {
    constructor(props: IChatDateProps) {
        super(props)
    }

    render() {
        return this.compile(ChatDateTemplate, this.props);
    }
}
