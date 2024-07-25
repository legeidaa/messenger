import { Block } from '@shared/lib/Block/index.ts'
import { ErrorInfo } from '@shared/partials/ErrorInfo/index.ts';
import { Link } from '@shared/partials/Link/index.ts';
import { router } from '@shared/lib/Router/Router.ts';
import { PagesPaths } from '@shared/lib/Router/model';
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
            href: PagesPaths.CHAT,
            text: 'Назад к чатам',
            events: {
                click: (e) => {
                    e.preventDefault()
                    router.go(PagesPaths.CHAT)
                },
            },
        }),
        error: '500',
        message: 'Мы уже фиксим',
    }),
})
