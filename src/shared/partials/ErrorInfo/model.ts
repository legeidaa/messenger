import { IBlockProps } from '@shared/lib/Block';
import { Link } from '../Link';

export interface IErrorInfoProps extends IBlockProps {
    error: string;
    message: string;
    link: Link
}
