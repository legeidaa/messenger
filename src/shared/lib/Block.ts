import * as Handlebars from 'handlebars'
import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

export interface IProps {
    __id?: string,
    events?: {
        [key: string]: (event: Event) => void
    },
    [key: string]: unknown
}

export default class Block {
    public static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    }

    public props: IProps = {
        __id: '',
        events: {},
    }

    public children: {
        [key: string]: Block
    }

    private _isMounted = false

    private _element: HTMLElement

    private _meta: {
        tagName: string;
        props: IProps;
    }

    private _id: string

    eventBus: () => EventBus

    constructor(tagName: string, propsAndChildren: IProps) {
        const { children, props } = this._getChildren(propsAndChildren)

        this._id = makeUUID();

        this._meta = {
            tagName,
            props,
        };
        this.children = children
        this.props = this._makePropsProxy({ ...props, __id: this._id })

        const eventBus = new EventBus()
        this.eventBus = () => eventBus

        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }

    private _getChildren(propsAndChildren: IProps) {
        const children: { [key: string]: Block } = {}
        const props: IProps = {}

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value
            } else {
                props[key] = value
            }
        })

        return { children, props }
    }

    compile(template: string, props: IProps) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.props.__id}"></div>`
        });

        const fragment = this._createDocumentElement('template');

        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs).trim()

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child.props.__id}"]`);

            stub.replaceWith(child.getContent())
            console.log(stub);
        })

        return fragment.content
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createDocumentElement = (elementToCreate?: string) => {
        let tagName
        if (!elementToCreate) {
            tagName = this._meta.tagName
        } else {
            tagName = elementToCreate
        }
        const element = document.createElement(tagName)
        element.setAttribute('data-id', this._id);

        return element
    }

    private _createResources() {
        this._element = this._createDocumentElement();
    }

    private _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    init() {
        this._createResources();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(props: IProps) {
        this.componentDidMount(props)
    }

    componentDidMount(props: IProps): void {
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM, this._meta.props);
    }

    // вызывается из-за переопределения свойства set в прокси
    private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
        if (oldProps.events) {
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

    componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
        return true;
    }

    // нужно определять самостоятельно во время первичного рендера
    dispatchComponentDidUpdate() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    setProps(nextProps: IProps) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    private _render() {
        const block = this.render()
        if (!this._isMounted) {
            this._isMounted = true
        }
        this._element.innerHTML = ''

        this._element.appendChild(block)

        this._addEvents()
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return ''
    }

    get element(): HTMLElement {
        // const elem = this._element.firstChild as HTMLElement
        // console.log(this._element, elem);
        // if (elem) {
        //     elem.setAttribute('data-id', this.props.__id)
        //     return elem
        // }
        return this._element
    }

    getContent() {
        return this.element
    }

    private _makePropsProxy(props: IProps): IProps {
        return new Proxy(props, {
            get: (target: IProps, prop: string | symbol) => {
                const value = target[prop as string];
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target: IProps, prop: string | symbol, value: unknown) => {
                // TODO заменить спред на deepclone
                const oldProps = { ...target }

                target[prop as string] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldProps }, { ...target })
                return true
            },
            deleteProperty: (target: IProps, prop: string | symbol) => {
                throw new Error('Нет доступа')
            },
        });
    }

    show() {
        this.getContent().style.display = 'block'
    }

    hide() {
        this.getContent().style.display = 'none'
    }
}
