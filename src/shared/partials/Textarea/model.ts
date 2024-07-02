import { IBlockProps } from '../../lib/Block';

export interface ITextareaProps extends IBlockProps {
    id?: string;
    title?: string;
    name?: string;
    className?: string;
    value?: string;
    placeholder?: string;
}
