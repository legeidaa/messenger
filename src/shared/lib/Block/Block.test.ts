import { expect } from "chai"
import { Block } from "./Block"
import Sinon from "sinon";

describe("Block", () => {
    let blockClass: typeof Block;
    before(() => {
        class Component extends Block {
            constructor(props: any) {
                super(props);
            }

            render() {
                return this.compile('<div id="div">{{text}}</div>', this.props)
            }
        }

        blockClass = Component
    })

    it('отрисовка данных из пропсов', () => {
        const textData = 'I am div!'
        const component = new blockClass({ text: textData })
        const res = component.getContent()?.innerHTML

        expect(res).to.be.eq(textData)
    })

    it('вызов события клика', () => {
        const handler = Sinon.stub()
        const component = new blockClass({ text: 'I am button!', events: { click: handler } })
        const event = new MouseEvent('click')
        component.getContent().dispatchEvent(event)

        expect(handler.calledOnce).to.be.true
    })

    it('вызов метода render при изменении пропсов', () => {
        const component = new blockClass({ text: 'I am button' })
        const spyDCM = Sinon.spy(component, 'render')
        component.setProps({ text: "bla" })

        expect(spyDCM.calledOnce).to.be.true
    })

    it('установка новых пропсов', () => {
        const component = new blockClass({ text: 'test' })
        component.setProps({ name: 'John' })

        expect(component.props.name).to.be.eq('John')
    })

    it('вызов componentDidUpdate', () => {
        const component = new blockClass({ text: 'test' })
        const spyDCM = Sinon.spy(component, 'componentDidUpdate')
        component.setProps({ name: 'John' })

        expect(spyDCM.calledOnce).to.be.true
    })

    it('вызов componentDidMount', () => {
        const component = new blockClass({ text: 'test' })
        const spyDCM = Sinon.spy(component, 'componentDidMount')

        component.dispatchComponentDidMount()

        expect(spyDCM.calledOnce).to.be.true
    })
})