// import { expect } from 'chai'
// import Sinon from "sinon";
import Sinon, { createSandbox, SinonStub } from 'sinon'
import { HTTPTransport } from './HTTPTransport'


describe('HTTP Transport', () => {
    const sandbox = createSandbox()
    let http: HTTPTransport
    let request: SinonStub<any>

    beforeEach(() => {
        http = new HTTPTransport('')
        request = sandbox.stub(http, 'request' as keyof typeof http)
            .callsFake(() => {
                return Promise.resolve(new XMLHttpRequest)
            })
    })
    afterEach(() => sandbox.restore())

    it('метод request вызывется с нужным url', () => {
        http.get('/user', { data: { a: '1', b: '2' } })

        Sinon.assert.calledWithMatch(request, '/user')
    })

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
