import { IBlockProps } from '@shared/lib/Block';

export interface IAvatarProps extends IBlockProps {
    profileAvatar?: boolean
    className?: string
    src: string
}
