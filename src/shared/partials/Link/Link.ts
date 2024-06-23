import { Block } from '@shared/lib/Block'
import LinkTemplate from './Link.hbs?raw';
import { ILinkProps } from './model';

export class Link extends Block {
    constructor(props: ILinkProps) {
        super(props)
    }

    render() {
        return this.compile(LinkTemplate, this.props);
    }
}
