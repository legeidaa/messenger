import { IBlockProps } from '@shared/lib/Block';
import { ErrorInfo } from '@shared/partials/ErrorInfo';

export interface IErrorServerPageProps extends IBlockProps {
    errorInfo: ErrorInfo
}
