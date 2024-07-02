import { Block } from '@shared/lib/Block'
import DialogItemTemplate from './DialogItem.hbs?raw';
import { IDialogItemProps } from './model';

export class DialogItem extends Block {
    constructor(props: IDialogItemProps) {
        super(props)
    }

    render() {
        return this.compile(DialogItemTemplate, this.props);
    }
}
