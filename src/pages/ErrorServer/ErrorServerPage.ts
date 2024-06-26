import { Block } from '@shared/lib/Block/index.ts'
import { ErrorInfo } from '@shared/partials/ErrorInfo/index.ts';
import { Link } from '@shared/partials/Link/index.ts';
import ErrorServerPageTemplate from './ErrorServerPage.hbs?raw';
import { IErrorServerPageProps } from './model.ts';

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
