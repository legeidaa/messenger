import { HTTPTransport } from '@shared/lib/HTTPTransport';
import { BaseURL } from './consts';

export class Api {
    private _transport: HTTPTransport

    constructor(urlPart: string) {
        this._transport = new HTTPTransport(BaseURL + urlPart)
    }

    public get transport(): HTTPTransport {
        return this._transport
    }
}
