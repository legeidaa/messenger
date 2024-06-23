import { IBlockProps } from '@shared/lib/Block';
import { Link } from '../Link';

export interface IProfileDataRowProps extends IBlockProps {
    className?: string,
    id?: string
    label?: string
    type?: string
    name?: string
    value?: string,
    readonly?: boolean,
    link?: Link
}
