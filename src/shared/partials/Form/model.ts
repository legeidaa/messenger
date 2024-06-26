import { Block, IBlockProps } from '../../lib/Block';

export interface IFormProps extends IBlockProps {
    className?: string
    formAction?: string
    formContent: Block | Block[]
    id?: string
}
