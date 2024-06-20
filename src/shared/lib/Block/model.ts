export interface IBlockProps {
    __id?: string,
    events?: {
        [key: string]: (event: Event) => void
    },
    [key: string]: unknown
}
