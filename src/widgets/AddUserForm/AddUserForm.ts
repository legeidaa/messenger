import { Block } from '@shared/lib/Block'
import AddUserFormTemplate from './AddUserForm.hbs?raw';
import { IAddUserFormProps } from './model';

export class AddUserForm extends Block {
    constructor(props: IAddUserFormProps) {
        super(props)
    }

    render() {
        return this.compile(AddUserFormTemplate, this.props);
    }
}
