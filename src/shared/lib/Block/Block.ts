import * as Handlebars from 'handlebars'
import { v4 as makeUUID } from 'uuid';
import EventBus from '../EventBus.ts';
import { IBlockProps } from './model.ts';

export class Block {
    public static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    }

    public props: IBlockProps = {
        __id: '',
        events: {},
        attr: {},
    }

    public children: {
        [key: string]: Block
    }

    public lists: {
        [key: string]: Block[]
    }

    public firstRender = false

    private _element: HTMLElement = document.createElement('div')

    private _id: string

    eventBus: () => EventBus

    constructor(propsAndChildren: IBlockProps) {
        const { children, props, lists } = this._getChildren(propsAndChildren)

        this._id = makeUUID()

        this.children = children
        this.lists = this._makePropsProxy({ ...lists }) as typeof this.lists
        this.props = this._makePropsProxy({ ...props, __id: this._id })

        const eventBus = new EventBus()
        this.eventBus = () => eventBus

        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }

    // вызывается в методе render
    public compile(template: string, props: IBlockProps) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.props.__id}"></div>`
        })

        const _tmpId = makeUUID()
        Object.entries(this.lists).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = document.createElement('template') as HTMLTemplateElement
        fragment.setAttribute('data-id', this._id);

        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs).trim()

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.props.__id}"]`);
            stub?.replaceWith(child.getContent())
        })

        Object.entries(this.lists).forEach(([key, child]) => {
            const listCont = document.createElement('template') as HTMLTemplateElement
            child.forEach((item) => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent());
                } else {
                    listCont.content.append(`${item}`);
                }
            })
            const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
            stub?.replaceWith(listCont.content)
        })

        return fragment.content.firstElementChild as HTMLElement
    }

    private _render() {
        const block = this.render()

        if (this._element) {
            this._element.replaceWith(block)
        }
        this._element = (block)
        this._addEvents()
        this.addAttributes()
    }

    // Может переопределять пользователь
    // Внутри вызывается compile
    render(): HTMLElement { return this.getContent() }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    setProps(nextProps: typeof this.props) {
        if (!nextProps) {
            return;
        }
        const { props, lists } = this._getChildren(nextProps)

        Object.assign(this.props, props)
        Object.assign(this.lists, lists)
    }

    getContent() {
        return this._element
    }

    private _componentDidMount(props: IBlockProps) {
        this.componentDidMount(props)
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount()
        })
        if (!this.firstRender) {
            this.firstRender = true
        }
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
    }

    componentDidMount(props: IBlockProps): void {
    }

    // вызывается из-за переопределения свойства set в прокси
    private _componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
        if (oldProps?.events) {
            const { events } = oldProps
            Object.keys(events).forEach((eventName) => {
                this._element.removeEventListener(eventName, events[eventName])
            });
        }

        const response = this.componentDidUpdate(oldProps, newProps)
        if (!response) {
            return
        }
        this._render();
    }

    // нужно определять самостоятельно во время первичного рендера
    dispatchComponentDidUpdate() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
        return true;
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    private _getChildren(propsAndChildren: IBlockProps) {
        const children: { [key: string]: Block } = {}
        const props: IBlockProps = {}
        const lists: { [key: string]: Block[] } = {}

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        })

        return { children, props, lists }
    }

    addAttributes() {
        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value);
        });
    }

    private _makePropsProxy(props: IBlockProps) {
        return new Proxy(props, {
            get: (target, prop: string | symbol) => {
                const value = target[prop as string];
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target, prop: string | symbol, value: unknown) => {
                // TODO заменить спред на deepclone
                const oldProps = { ...target }

                target[prop as string] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldProps }, { ...target })
                return true
            },
            deleteProperty: (target, prop: string | symbol) => {
                throw new Error('Нет доступа')
            },
        });
    }
}
