import { IBlockProps } from '../../lib/Block';

export interface IButtonProps extends IBlockProps {
    text?: string;
    type?: string;
    className?: string;
    href?: string;
}
