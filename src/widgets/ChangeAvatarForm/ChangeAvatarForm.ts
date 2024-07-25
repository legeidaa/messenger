import { Block } from '@shared/lib/Block'
import ChangeAvatarFormTewplate from './ChangeAvatarForm.hbs?raw';
import { IChangeAvatarFormProps } from './model';

export class ChangeAvatarForm extends Block {
    constructor(props: IChangeAvatarFormProps) {
        super(props)
    }

    render() {
        return this.compile(ChangeAvatarFormTewplate, this.props);
    }
}
