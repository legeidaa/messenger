import { queryStringify } from '../utils'

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type HTTPTransportMethod = (url: string, options?: IMethodOptions) => Promise<XMLHttpRequest>

export interface IMethodOptions {
    headers?: { [key: string]: string },
    timeout?: number
    data?: Record<string, unknown> | FormData,
    withCredentials?: boolean,
    responseType?: XMLHttpRequestResponseType
}

interface IRequestOptions extends IMethodOptions {
    method: METHODS,
}

export class HTTPTransport {
    constructor(private _baseURL: string) {
        this._baseURL = _baseURL
    }

    get: HTTPTransportMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout)
    }

    post: HTTPTransportMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
    }

    put: HTTPTransportMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
    }

    delete: HTTPTransportMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
    }

    request(url: string, options: IRequestOptions = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> {
        const {
            data,
            headers = {},
            withCredentials = true,
            responseType = 'json',
            method,
        } = options

        return new Promise((resolve, reject) => {
            url = this._baseURL + url
            const xhr = new XMLHttpRequest()
            xhr.open(method as unknown as string, url)

            xhr.onload = () => {
                const status = xhr.status || 0
                if (status >= 200 && status < 300) {
                    resolve(xhr.response)
                } else {
                    const message = {
                        0: 'abort',
                        100: 'Information',
                        200: 'Ok',
                        300: 'Redirect failed',
                        400: 'Access error',
                        500: 'Internal server error',
                    }[Math.floor(status / 100) * 100]
                    reject({ status, reason: xhr.response?.reason || message })
                }
            }

            xhr.onabort = () => reject({ reason: 'abort' })
            xhr.onerror = () => reject({ reason: 'network error' })
            xhr.ontimeout = () => reject({ reason: 'timeout' })

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key])
            })

            // xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
            // xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type")
            // xhr.setRequestHeader("Access-Control-Allow-Origin", "*")

            if (method === METHODS.GET && data) {
                url += queryStringify(data)
            }

            xhr.timeout = timeout
            xhr.responseType = responseType
            xhr.withCredentials = withCredentials

            if (method === METHODS.GET || !data) {
                xhr.send()
            } else if (data instanceof FormData) {
                xhr.send(data)
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json')
                console.log(data);

                xhr.send(JSON.stringify(data))
            }
        })
    }
}
