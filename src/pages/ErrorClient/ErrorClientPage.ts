import { Block } from '@shared/lib/Block'
import { ErrorInfo } from '@shared/partials/ErrorInfo';
import { Link } from '@shared/partials/Link';
import ErrorClientPageTemplate from './ErrorClientPage.hbs?raw';
import { IErrorClientPageProps } from './model';

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

// function render(query: string, block: Block) {
//     const root = document.querySelector(query)
//     root?.appendChild(block.getContent())
//     block.dispatchComponentDidMount()
//     return root;
// }

// setTimeout(() => {
//     render('#app', errorClientPage)
// }, 1)
