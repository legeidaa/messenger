import cloneDeep from "@shared/utils/cloneDeep"
import { Reducer } from "./model"
import { State } from "./state"

export const reducer: Reducer = (state, action) => {
    let newState = cloneDeep(state) as State

    switch (action.type) {
        case 'SET_USER':
            newState.user = action.user
            break
        case 'SET_CHATS':
            newState.chats = action.chats
            break
        case 'SET_CURRENT_CHAT':
            newState.currentChat = action.currentChat
            break
    }
    state = newState
    return state
}