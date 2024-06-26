import { Block } from '@shared/lib/Block/index.ts'
import { ErrorInfo } from '@shared/partials/ErrorInfo/index.ts';
import { Link } from '@shared/partials/Link/index.ts';
import ErrorClientPageTemplate from './ErrorClientPage.hbs?raw';
import { IErrorClientPageProps } from './model.ts';

export class ErrorClientPage extends Block {
    constructor(props: IErrorClientPageProps) {
        super(props)
    }

    render() {
        return this.compile(ErrorClientPageTemplate, this.props);
    }
}

export const errorClientPage = new ErrorClientPage({
    errorInfo: new ErrorInfo({
        link: new Link({
            href: '#chat',
            text: 'Назад к чатам',
        }),
        error: '404',
        message: 'Не туда попали',
    }),
})
