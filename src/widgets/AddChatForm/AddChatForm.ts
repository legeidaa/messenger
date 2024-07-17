import { Block } from '@shared/lib/Block'
import AddChatFormTemplate from './AddChatForm.hbs?raw';
import { IAddChatFormProps } from './model';

export class AddChatForm extends Block {
    constructor(props: IAddChatFormProps) {
        super(props)
    }

    render() {
        return this.compile(AddChatFormTemplate, this.props);
    }
}
