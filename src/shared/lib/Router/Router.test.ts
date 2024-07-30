import { expect } from 'chai'
import Sinon from 'sinon'
import { Router } from './Router'
import { Block } from '../Block'
import { PagesPaths } from './model'

describe('Router', () => {
    let router: Router
    let BlockClass: typeof Block;

    before(() => {
        router = new Router('#app')

        class Component extends Block {
            constructor(props: any) {
                super(props);
            }

            render() {
                return this.compile('<div id="div">{{text}}</div>', this.props)
            }
        }

        BlockClass = Component
    })

    it('создание рутера', () => {
        const spy = Sinon.spy(router, 'start')
        router.start()

        expect(spy.calledOnce).to.be.true
    })

    it('подключение пути к рутеру', () => {
        const component = new BlockClass({ text: 'test' })

        router
            .use(PagesPaths.CHAT, component)
            .start()

        expect(router.routes.length).to.be.eq(1)
    })

    it('переход на страницу', () => {
        const chatComponent = new BlockClass({ text: 'test' })
        const mainComponent = new BlockClass({ text: 'test' })
        const spy = Sinon.spy(router, 'go')

        router
            .use(PagesPaths.CHAT, chatComponent)
            .use(PagesPaths.MAIN, mainComponent)
            .start()

        router.go(PagesPaths.CHAT)

        expect(spy.calledOnce).to.be.true
    })

    it('вызов history.forward', () => {
        const spy = Sinon.spy(history, 'forward');
        router.forward()
        expect(spy.calledOnce).to.be.true
    });

    it('вызов history.back', () => {
        const spy = Sinon.spy(history, 'back');
        router.back()
        expect(spy.calledOnce).to.be.true
    });
})
