import { IBlockProps } from '@shared/lib/Block';
import { Avatar } from '@shared/partials';

export interface IDialogItemProps extends IBlockProps {
    avatar: Avatar,
    name: string,
    message: string,
    time: string,
    count: number,
    messageName: string,
    selected: boolean
}
