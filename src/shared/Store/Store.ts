// @ts-nocheck

import cloneDeep from "@shared/utils/cloneDeep"

const createStore = (reducer, initialState) => {
    const subscribers = []
    let currentState = initialState

    return {
        getState: () => currentState,
        subscribe: (fn) => {
            subscribers.push(fn)
            // return () => {
            //     subscribers = subscribers.filter(sub => sub !== fn)
            // }
            fn(currentState)
        },
        dispatch: (action) => {
            console.log(currentState);

            currentState = reducer(currentState, action)
            console.log(currentState);

            subscribers.forEach(fn => fn(currentState))
        },
    }
}

const reducer = (state, action) => {
    let newState = cloneDeep(state)

    //  заменить на switch-case
    if (action.type === 'SET_TEXT') {
        console.log("SET_TEXT");
        newState.buttonText = action.buttonText
        return newState
    }
    if (action.type === 'SET_USER') {
        newState.user = action.user
        console.log("inside SET_USER", newState);
        
        return newState
    } else {
        return state
    }
}

let state = {
    buttonText: 'Сохранить',
}

// let setTextAction = {
//     type: 'SET_TEXT',
//     buttonText: '',
// }

let store = Object.freeze(createStore(reducer, state))

export default store