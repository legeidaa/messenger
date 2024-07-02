import { IBlockProps } from '@shared/lib/Block';

export interface IMessageProps extends IBlockProps {
    isOut?: boolean
    attachedImgSrc?: string
    text?: string
    status?: 'sent' | 'received'
    time?: string
}
