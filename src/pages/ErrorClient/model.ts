import { IBlockProps } from '@shared/lib/Block/index.ts';
import { ErrorInfo } from '@shared/partials/ErrorInfo/index.ts';

export interface IErrorClientPageProps extends IBlockProps {
    errorInfo: ErrorInfo
}
