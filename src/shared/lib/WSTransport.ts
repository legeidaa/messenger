import EventBus from "./EventBus";

export enum WSTransportEvents {
    CONNECTED = 'connected',
    ERROR = 'error',
    MESSAGE = 'message',
    CLOSE = 'close',
}

export class WSTransport extends EventBus {
    private socket?: WebSocket
    private pingInterval?: ReturnType<typeof setInterval>
    private readonly pingIntervalTime = 30000
    private url: string

    constructor(url: string) {
        super()
        this.url = url
    }

    public send(data: string | number | object) {
        if (!this.socket) {
            throw new Error('Socket is not connected')
        }
        this.socket.send(JSON.stringify(data))
    }

    public connect(): Promise<void> {
        if (this.socket) {
            throw new Error('Socket is already connected')
        }
        this.socket = new WebSocket(this.url)
        this.subscribe(this.socket)
        this.setupPing()

        return new Promise((resolve, reject) => {
            this.on(WSTransportEvents.ERROR, reject)
            this.on(WSTransportEvents.CONNECTED, () => {
                this.off(WSTransportEvents.ERROR, reject)
                resolve()
            })
        })
    }

    public close() {
        this.socket?.close()
        clearInterval(this.pingInterval)
    }

    public setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({ type: 'ping' })
        }, this.pingIntervalTime)

        this.on(WSTransportEvents.CLOSE, () => {
            clearInterval(this.pingInterval)
            this.pingInterval = undefined
        })
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => this.emit(WSTransportEvents.CONNECTED))
        socket.addEventListener('close', () => this.emit(WSTransportEvents.CLOSE))
        socket.addEventListener('error', (e) => this.emit(WSTransportEvents.ERROR, e))
        socket.addEventListener('message', (mesage) => {
            try {
                const data = JSON.parse(mesage.data)
                if(['pong', 'user connected'].includes(data?.type)) {
                    return
                }
                this.emit(WSTransportEvents.MESSAGE, data)
            } catch (e) {
                // Игнорируем ошибки JSON
            }
        })
        
    }
}