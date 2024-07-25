import { Block } from './Block.ts'

export interface IBlockProps {
    __id?: string,
    events?: {
        [key: string]: (event: Event) => void
    },
    lists?: Block[],
    attr?: {
        [key: string]: string,
    }
    [key: string]: unknown
}
