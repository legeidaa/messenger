import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<!DOCTYPE html><body id="app">JSDOM</body>`, {
    url: 'http://localhost/3000',
    referrer: 'http://localhost/3000',
})

global.window = jsdom.window
global.document = jsdom.window.document
global.FormData = jsdom.window.FormData
global.Node = jsdom.window.Node
global.MouseEvent = jsdom.window.MouseEvent
global.history = jsdom.window.history
global.XMLHttpRequest = jsdom.window.XMLHttpRequest
