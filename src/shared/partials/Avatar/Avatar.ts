import { Block } from '@shared/lib/Block'
import AvatarTemplate from './Avatar.hbs?raw';
import { IAvatarProps } from './model';

export class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super(props)
    }

    render() {
        return this.compile(AvatarTemplate, this.props);
    }
}
