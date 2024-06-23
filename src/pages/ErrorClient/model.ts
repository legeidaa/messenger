import { IBlockProps } from '@shared/lib/Block';
import { ErrorInfo } from '@shared/partials/ErrorInfo';

export interface IErrorClientPageProps extends IBlockProps {
    errorInfo: ErrorInfo
}
