import { Block } from '@shared/lib/Block'
import { activateModals } from '@shared/utils';
import ModalTemplate from './Modal.hbs?raw';
import { IModalProps } from './model';

export class Modal extends Block {
    constructor(props: IModalProps) {
        super(props)
    }

    render() {
        return this.compile(ModalTemplate, this.props);
    }

    componentDidMount() {
        console.log('modal did mount');
        
        activateModals()
        return true
    }
}
