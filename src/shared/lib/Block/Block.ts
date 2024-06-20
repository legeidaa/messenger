import * as Handlebars from 'handlebars'
import { v4 as makeUUID } from 'uuid';
import EventBus from '../EventBus';
import { IBlockProps } from './model';

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
    }

    public children: {
        [key: string]: Block
    }

    private _isMounted = false

    private _element: HTMLElement = document.createElement('div')

    private _id: string

    eventBus: () => EventBus

    constructor(propsAndChildren: IBlockProps) {
        const { children, props } = this._getChildren(propsAndChildren)

        this._id = makeUUID();

        this.children = children
        this.props = this._makePropsProxy({ ...props, __id: this._id })

        const eventBus = new EventBus()
        this.eventBus = () => eventBus

        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }

    // вызывается в методе render
    compile(template: string, props: IBlockProps) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.props.__id}"></div>`
        });

        const fragment = document.createElement('template') as HTMLTemplateElement
        fragment.setAttribute('data-id', this._id);

        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs).trim()

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.props.__id}"]`);
            stub?.replaceWith(child.getContent())
        })

        return fragment.content.firstElementChild as HTMLElement
    }

    private _render() {
        const block = this.render()
        if (!this._isMounted) {
            this._isMounted = true
        }
        if (this._element) {
            this._element.replaceWith(block)
        }
        this._element = (block)
        this._addEvents()
    }

    // Может переопределять пользователь
    // Внутри вызывается compile
    render(): HTMLElement { return this.getContent() }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    setProps(nextProps: IBlockProps) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    getContent() {
        return this._element
    }

    private _componentDidMount(props: IBlockProps) {
        this.componentDidMount(props)
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount()
        })
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
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
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

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value
            } else {
                props[key] = value
            }
        })

        return { children, props }
    }

    private _makePropsProxy(props: IBlockProps): IBlockProps {
        return new Proxy(props, {
            get: (target: IBlockProps, prop: string | symbol) => {
                const value = target[prop as string];
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target: IBlockProps, prop: string | symbol, value: unknown) => {
                // TODO заменить спред на deepclone
                const oldProps = { ...target }

                target[prop as string] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldProps }, { ...target })
                return true
            },
            deleteProperty: (target: IBlockProps, prop: string | symbol) => {
                throw new Error('Нет доступа')
            },
        });
    }
}
