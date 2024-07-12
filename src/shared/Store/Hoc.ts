import { Block, IBlockProps } from "@shared/lib/Block";
import {store} from "./Store";
import { isEqual } from "@shared/utils/isEqual";
import { Indexed } from "@shared/models/common";

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    return class extends Component {
        constructor(props: IBlockProps) {
            let state = mapStateToProps(store.getState());
            super({ ...props, ...state })

            store.subscribe(() => {
                const newState = mapStateToProps(store.getState())

                // добавляет в пропсы компонента данные из хранилища
                if (!isEqual(state, newState)) {
                    console.log("Prop changed, oldState: ", state, "newState: ", newState);
                    this.setProps({ ...newState });
                }
                state = newState;
            })
        }
    }
} 