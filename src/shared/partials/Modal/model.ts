import { Block, IBlockProps } from '@shared/lib/Block';

export interface IModalProps extends IBlockProps {
    className?: string,
    content: Block | string,
    dataModalType: string
}
