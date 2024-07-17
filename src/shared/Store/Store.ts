import { Action, Reducer, Subscriber } from "./model"
import { reducer } from "./reducer"
import { state, State } from "./state"

const createStore = (reducer: Reducer, initialState: State) => {

    const subscribers: Subscriber<State>[] = []
    let currentState = initialState

    return {
        getState: () => currentState,
        subscribe: (fn: Subscriber<State>) => {
            subscribers.push(fn)
            fn(currentState)
        },
        dispatch: (action: Action) => {
            currentState = reducer(currentState, action)
            console.log("currentState: ", currentState);
            

            subscribers.forEach(fn => fn(currentState))
        },
    }
}

export const store = Object.freeze(createStore(reducer, state))
