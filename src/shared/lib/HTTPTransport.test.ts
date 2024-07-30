import Sinon, { SinonFakeXMLHttpRequest } from 'sinon'
import { HTTPTransport } from './HTTPTransport'
import { expect } from 'chai'


describe('HTTP Transport', () => {

    let xhr: Sinon.SinonFakeXMLHttpRequestStatic
    let requests: SinonFakeXMLHttpRequest[]
    beforeEach(() => {
        xhr = Sinon.useFakeXMLHttpRequest()
        requests = []
        xhr.onCreate = (req) => {
            requests.push(req)
        }
    })

    afterEach(() => {
        xhr.restore()
    })

    it('обработка таймаутов', (done) => {
        const clock = Sinon.useFakeTimers();
        const client = new HTTPTransport('https://test.com');

        client.get('/timeout', { timeout: 1000 })
            .catch((error) => {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('Request timeout');
            })
            .finally(() => {
                done()
            })

        clock.tick(1001)
        clock.restore()
    })

    it('отправка GET запроса', (done) => {
        const client = new HTTPTransport('https://test.com')

        client.get('/data').then(() => {
            done()
        })

        expect(requests[0].method).to.equal('GET');

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'test' }))
    })

    it('отправка POST запроса', (done) => {
        const client = new HTTPTransport('https://test.com')

        client.post('/data', { data: { a: '1', b: '2' } }).then(() => {
            done()
        })

        expect(requests[0].method).to.equal('POST');
        expect(requests[0].requestBody).to.deep.equal(JSON.stringify({ a: "1", b: "2" }));

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'test' }))
    })

    it('отправка PUT запроса', (done) => {
        const client = new HTTPTransport('https://test.com')

        client.put('/data', { data: { a: 3, b: 4 } }).then(() => {
            done()
        })

        expect(requests[0].method).to.equal('PUT');
        expect(requests[0].requestBody).to.deep.equal(JSON.stringify({ a: 3, b: 4 }));

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'test' }))
    })

    it('отправка DELETE запроса', (done) => {
        const client = new HTTPTransport('https://test.com')

        client.delete('/data').then(() => {
            done()
        })

        expect(requests[0].method).to.equal('put');

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'test' }))
    })
})
