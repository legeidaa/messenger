import { IBlockProps } from '@shared/lib/Block';

export interface ILinkProps extends IBlockProps {
    className?: string
    href: string
    text: string
}
