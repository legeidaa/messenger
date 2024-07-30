// import { expect } from 'chai'
// import Sinon from "sinon";
import Sinon, { createSandbox, SinonFakeXMLHttpRequest, SinonStub } from 'sinon'
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
            // console.log("REQUESTS1", response, requests[0]);
            done()
        })

        expect(requests[0].method).to.equal('POST');
        expect(requests[0].requestBody).to.deep.equal(JSON.stringify({ a: "1", b: "2" }));

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'test' }))
    })


    it('метод request вызывется с нужным url', () => {
        let request: SinonStub<any>
        let http = new HTTPTransport('')
        const sandbox = createSandbox()
        request = sandbox.stub(http, 'request' as keyof typeof http)
            .callsFake(() => {
                
                return Promise.resolve(new XMLHttpRequest)
            })

        http.get('/user', { data: { a: '1', b: '2' } })

        Sinon.assert.calledWithMatch(request, '/user')
        sandbox.restore()
    })

    // it('отправка GET запроса', (done) => {
    //     const client = new HTTPTransport('https://test.com')

    //     client.get('/data', { data: { a: '1', b: '2' } }).then((response) => {
    //         console.log("RESPONSE",response, requests[0]);

    //         // expect(response).to.deep.equal({ data: 'test' })
    //         done()
    //     })
    //     // console.log(requests[0])

    //     // expect(requests[0].method).to.equal('GET');
    //     // ВЫНЕСТИ В метод request вызывется с нужным url
    //     // expect(requests[0].url).to.equal('https://test.com/data?a=1&b=2');

    //     requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'test' }))
    // })

    // it('should stringify query object where parameters are string and number', () => {
    //     http.get('', { data: { a: 1, b: 'string' } })
    //     expect(request).calledWithMatch('?a=1&b=string', 'GET')
    // })

    // it('should encode characters for query', () => {
    //     http.get('', { data: { a: '1+2', b: '2 2' } })
    //     expect(request).calledWithMatch('?a=1%2B2&b=2%202', 'GET')
    // })

})

// describe("HTTPTransport", () => {
//     const transport = new HTTPTransport("http://example.com")

//     it("should return xmlhttprequest for get request", (done) => {
//         transport.get("/test")
//             .then((req: XMLHttpRequest) => {
//                 expect(req).to.be.an.instanceof(XMLHttpRequest)
//                 done()
//             })
//             .catch(done)
//     })

//     it("should return xmlhttprequest for post request", (done) => {
//         transport.post("/test")
//             .then((req: XMLHttpRequest) => {
//                 expect(req).to.be.an.instanceof(XMLHttpRequest)
//                 done()
//             })
//             .catch(done)
//     })

//     it("should return xmlhttprequest for put request", (done) => {
//         transport.put("/test")
//             .then((req: XMLHttpRequest) => {
//                 expect(req).to.be.an.instanceof(XMLHttpRequest)
//                 done()
//             })
//             .catch(done)
//     })

//     it("should return xmlhttprequest for delete request", (done) => {
//         transport.delete("/test")
//             .then((req: XMLHttpRequest) => {
//                 expect(req).to.be.an.instanceof(XMLHttpRequest)
//                 done()
//             })
//             .catch(done)
//     })
// })

// import { expect } from 'chai';
// import { HTTPTransport, IMethodOptions } from './HTTPTransport';
// import sinon from 'sinon';

// describe('HTTPTransport', () => {
//     let transport: HTTPTransport;
//     let xhrMock: sinon.SinonFakeXMLHttpRequestStatic;

//     beforeEach(() => {
//         transport = new HTTPTransport('https://example.com');
//         xhrMock = sinon.useFakeXMLHttpRequest();
//     });

//     afterEach(() => {
//         xhrMock.restore();
//     });

//     it('should make a GET request', async (done) => {
//         const url = '/users';
//         const options: IMethodOptions = {
//             data: { name: 'John Doe' }
//         }
//         const response = { status: 200, response: { data: 'Hello World' } };

//         xhrMock.onCreate = (xhr) => {
//             // xhr.onload = () => {
//             //     xhr.status = response.status;
//             //     xhr.response = response.response;
//             // };
//             console.log("asdasdasada", xhr);

//         };

//         const result = await transport.get(url, options);
//         expect(result).to.deep.equal(response.response);
//         done()
//     });

// it('should make a POST request', async () => {
//     const url = '/users';
//     const options = { method: 'POST', data: { name: 'John Doe' } };
//     const response = { status: 201, response: { data: 'User created' } };

//     xhrMock.onCreate = (xhr) => {
//         xhr.onload = () => {
//             xhr.status = response.status;
//             xhr.response = response.response;
//         };
//     };

//     const result = await transport.post(url, options);
//     expect(result).to.deep.equal(response.response);
// });

// it('should handle errors', async () => {
//     const url = '/users';
//     const options = { method: 'GET' };
//     const error = { status: 404, reason: 'Not Found' };

//     xhrMock.onCreate = (xhr) => {
//         xhr.onload = () => {
//             xhr.status = error.status;
//             xhr.response = error.reason;
//         };
//     };

//     try {
//         await transport.get(url, options);
//         expect.fail('Expected an error to be thrown');
//     } catch (err) {
//         expect(err).to.deep.equal(error);
//     }
// });

// it('should handle timeouts', async () => {
//     const url = '/users';
//     const options = { method: 'GET', timeout: 100 };
//     const error = { reason: 'timeout' };

//     xhrMock.onCreate = (xhr) => {
//         xhr.ontimeout = () => {
//             xhr.response = error.reason;
//         };
//     };

//     try {
//         await transport.get(url, options);
//         expect.fail('Expected an error to be thrown');
//     } catch (err) {
//         expect(err).to.deep.equal(error);
//     }
// });

// it('should handle aborts', async () => {
//     const url = '/users';
//     const options = { method: 'GET' };
//     const error = { reason: 'abort' };

//     xhrMock.onCreate = (xhr) => {
//         xhr.onabort = () => {
//             xhr.response = error.reason;
//         };
//     };

//     try {
//         const xhr = await transport.get(url, options);
//         xhr.abort();
//         expect.fail('Expected an error to be thrown');
//     } catch (err) {
//         expect(err).to.deep.equal(error);
//     }
// });
// });




