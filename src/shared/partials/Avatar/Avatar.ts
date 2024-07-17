import { Block } from '@shared/lib/Block'
import AvatarTemplate from './Avatar.hbs?raw';
import { IAvatarProps } from './model';
import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'

export class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super({
            ...props,
            fallbackSrc: avatarSkeletonSrc
        })
    }

    render() {
        return this.compile(AvatarTemplate, this.props);
    }
}
