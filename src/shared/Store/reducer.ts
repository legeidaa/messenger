import cloneDeep from "@shared/utils/cloneDeep"
import { Reducer } from "./model"
import { State } from "./state"

export const reducer: Reducer = (state, action) => {
    let newState = cloneDeep(state) as State

    switch (action.type) {
        // case 'SET_TEXT':
        //     newState.buttonText = action.buttonText
        //     break

        // case 'SET_SAMPLE_PROPS':
        //     newState.sampleProps = action.sampleProps
        //     break
        case 'SET_USER':
            newState.user = action.user
            break
    }
    state = newState
    return state
}