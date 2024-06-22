import { Block } from './Block'

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
