import EventBus from './EventBus';

interface IProps {
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
        events: {},
    }

    private isMounted = false

    private _element: HTMLElement

    private _meta: { tagName: string; props: object; }

    eventBus: () => EventBus;

    constructor(tagName: string = 'div', props: object = {}) {
        this._meta = {
            tagName,
            props,
        };

        this.props = this._makePropsProxy(props);
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    private _createDocumentElement = (): HTMLElement => {
        const { tagName } = this._meta
        return document.createElement(tagName)
    }

    private _createResources() {
        this._element = this._createDocumentElement();
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
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

    get element(): HTMLElement {
        return this._element!;
    }

    private _render() {
        const block = this.render()
        if (!this.isMounted) {
            this.isMounted = true
        }
        this._addEvents()

        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element!.innerHTML = block
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return ''
    }

    getContent(): HTMLElement {
        return this.element
    }

    private _makePropsProxy(props: Partial<Record<keyof object, unknown>>) {
        return new Proxy(props, {
            get: (target: Partial<Record<string, unknown>>, prop: string | symbol) => {
                const value = target[prop as string];
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target: Partial<Record<string, unknown>>, prop: string | symbol, value: unknown) => {
                // TODO заменить спред на deepclone
                const oldProps = { ...target }

                target[prop as string] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldProps }, { ...target })
                return true
            },
            deleteProperty: (target: Partial<Record<string, unknown>>, prop: string | symbol) => {
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
