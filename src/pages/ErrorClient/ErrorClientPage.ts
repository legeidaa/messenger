import { Block } from '@shared/lib/Block/index.ts'
import { ErrorInfo } from '@shared/partials/ErrorInfo/index.ts';
import { Link } from '@shared/partials/Link/index.ts';
import { router } from '@shared/lib/Router/Router.ts';
import { PagesPaths } from '@shared/lib/Router/model';
import ErrorClientPageTemplate from './ErrorClientPage.hbs?raw';
import { IErrorClientPageProps } from './model.ts';

export class ErrorClientPage extends Block {
    constructor(props: IErrorClientPageProps) {
        super(props)
    }

    override render() {
        return this.compile(ErrorClientPageTemplate, this.props);
    }
}

export const errorClientPage = new ErrorClientPage({
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
        error: '404',
        message: 'Не туда попали',
    }),
})
