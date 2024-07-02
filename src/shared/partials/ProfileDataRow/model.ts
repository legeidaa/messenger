import { IBlockProps } from '@shared/lib/Block';
import { Link } from '../Link';
import { Input } from '../Input';

export interface IProfileDataRowProps extends IBlockProps {
    className?: string,
    id?: string
    label?: string
    link?: Link
    input?: Input
}
