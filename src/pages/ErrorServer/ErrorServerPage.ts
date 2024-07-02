import { Block } from '@shared/lib/Block'
import { ErrorInfo } from '@shared/partials/ErrorInfo';
import { Link } from '@shared/partials/Link';
import ErrorServerPageTemplate from './ErrorServerPage.hbs?raw';
import { IErrorServerPageProps } from './model';

export class ErrorServerPage extends Block {
    constructor(props: IErrorServerPageProps) {
        super(props)
    }

    render() {
        return this.compile(ErrorServerPageTemplate, this.props);
    }
}

export const errorServerPage = new ErrorServerPage({
    errorInfo: new ErrorInfo({
        link: new Link({
            href: '#chat',
            text: 'Назад к чатам',
        }),
        error: '500',
        message: 'Мы уже фиксим',
    }),
})
