enum METHODS {
    GET,
    POST,
    PUT,
    DELETE,
}

export function queryStringify(data: Record<string, string>): string {
    if (typeof data !== 'object') {
        throw new Error('Data must be object')
    }

    let queryString = '?'

    Object.keys(data).forEach((key) => {
        queryString += `${key}=${data[key]}&`
    })

    return queryString.slice(0, -1)
}

interface IMethodOptions {
    headers?: { [key: string]: string },
    timeout?: number
}

interface IRequestOptions {
    headers?: { [key: string]: string },
    data?: Record<string, string>,
    method: METHODS,
    timeout?: number
}

export class HTTPTransport {
    get(url: string, options: IMethodOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout)
    }

    post(url: string, options: IMethodOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
    }

    put(url: string, options: IMethodOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
    }

    delete(url: string, options: IMethodOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
    }

    request(url: string, options: IRequestOptions = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> {
        const { headers = {}, method, data } = options

        const xhr = new XMLHttpRequest()

        if (method === METHODS.GET && data) {
            url += queryStringify(data)
        }
        xhr.open(method as unknown as string, url)

        xhr.timeout = timeout

        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key])
        })

        return new Promise((resolve, reject) => {
            xhr.onload = function () {
                resolve(xhr)
            }
            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (method === METHODS.GET || !data) {
                xhr.send()
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    }
}
