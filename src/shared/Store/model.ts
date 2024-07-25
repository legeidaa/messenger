import { State } from './state'

export type Subscriber<T> = (state: T) => void
export type Action = { type: string, [key: string]: any }
export type Reducer = (state: State, action: Action) => State
