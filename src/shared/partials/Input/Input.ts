import './Input.scss'
import InputTemplate from './Input.hbs?raw';
import { Block, IBlockProps } from '../../lib/Block';
import { IInputProps } from './model';

export class Input extends Block {
    constructor(props: IInputProps) {
        super({
            ...props,
            events: {
                change: (e) => {
                    if (this.getContent().getAttribute('type') !== 'file') {
                        const target = e.target as HTMLInputElement
                        this.setProps({ value: target?.value })
                    }
                },
            }
        })


    }
    componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
        return true
    }

    render() {
        return this.compile(InputTemplate, this.props);
    }
}
