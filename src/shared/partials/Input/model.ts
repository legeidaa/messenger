import { IBlockProps } from '../../lib/Block';

export interface IInputProps extends IBlockProps {
    type: string;
    id?: string;
    title?: string;
    name?: string;
    className?: string;
    value?: string;
    placeholder?: string;
}
