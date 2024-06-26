import { Block, IBlockProps } from '../../lib/Block/index.ts';

export interface IFormProps extends IBlockProps {
    className?: string
    formAction?: string
    formContent: Block | Block[]
    id?: string
}
