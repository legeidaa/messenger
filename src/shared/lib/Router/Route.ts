import { Block } from '@shared/lib/Block';
import { PagesPaths } from './model';

interface IRouteProps {
    rootQuery: string
}

export class Route {
    private _pathname: PagesPaths
    private _blockClass: Block;
    private _block: null | Block;
    private _props: IRouteProps;
    private _root: HTMLElement | null;

    constructor(pathname: PagesPaths, view: Block, props: IRouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;

        this._root = document.querySelector(this._props.rootQuery)
    }

    navigate(pathname: PagesPaths) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._root) {
            this._root.innerHTML = ''   
            this._block?.dispatchComponentDidUnmount()
        } else {
            throw new Error('Root not found')
        }
    }

    match(pathname: PagesPaths) {
        return pathname === this._pathname
    }

    render() {
        if (!this._block) {
            this._block = this._blockClass
        }
        if (!this._root) {
            throw new Error('Root element for router not found')
        }

        this._root.insertAdjacentElement('beforeend', this._block.getContent())
        this._block.dispatchComponentDidMount();
        
        this._block.show();
    }
}
