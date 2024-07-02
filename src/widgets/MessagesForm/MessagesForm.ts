import { Block } from '@shared/lib/Block'
import MessagesFormTemplate from './MessagesForm.hbs?raw';
import { IMessagesFormProps } from './model';

export class MessagesForm extends Block {
    constructor(props: IMessagesFormProps) {
        super(props)
    }

    render() {
        return this.compile(MessagesFormTemplate, this.props);
    }
}
