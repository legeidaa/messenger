import { Block, IBlockProps } from '../../lib/Block';

export interface IInputFieldProps extends IBlockProps {
    className?: string;
    error?: string;
    placeholder?: string;
    id: string;
    label?: string;
    input: Block;
}
