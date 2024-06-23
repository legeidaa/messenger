import './ErrorInfo.scss'
import { Block } from '@shared/lib/Block';
import ErrorInfoTemplate from './ErrorInfo.hbs?raw';
import { IErrorInfoProps } from './model';

export class ErrorInfo extends Block {
    constructor(props: IErrorInfoProps) {
        super(props)
    }

    render() {
        return this.compile(ErrorInfoTemplate, this.props);
    }
}
