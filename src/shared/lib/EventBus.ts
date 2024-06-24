export default class EventBus {
    public listeners: Record<string, Array<(...args: any[]) => void>>;
    // public listeners: Record<string, Array<(...args: any[]) => void>>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: (...args: any[]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: any[]) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback,
        );
    }

    emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
