import { Block } from '@shared/lib/Block'
import UserCardTemplate from './UserCard.hbs?raw';
import { IUserCardProps } from './model';

export class UserCard extends Block {
    constructor(props: IUserCardProps) {
        super(props)
    }

    render() {
        return this.compile(UserCardTemplate, this.props);
    }
}
