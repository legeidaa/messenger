// @ts-nocheck

import { Block } from "@shared/lib/Block";
import store from "./Store";

export function connect(Component: typeof Block) {
    // используем class expression
    return class extends Component {
        constructor(...args) {
            super(...args);

            store.subscribe(() => {
                console.log('in the subscription', this, { ...store.getState() })

                // добавляет в пропсы компонента данные из хранилища
                this.setProps({ ...store.getState() })
            })
        }
    }
} 