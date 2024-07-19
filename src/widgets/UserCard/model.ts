import { IBlockProps } from '@shared/lib/Block';
import { Avatar, Button } from '@shared/partials';

export interface IUserCardProps extends IBlockProps {
    avatar: Avatar,
    name: string,
    displayName: string,
    button: Button
}
