import { createReducer, on } from "@ngrx/store";
import { customIncrease, decrement, decrementByValue, increment, incrementByValue, reset, welcome } from "../actions/counter.action";
import { initialState } from "../state/state";

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
  on(decrement, (state) => ({ ...state, counter: state.counter - 1 })),
  on(reset, (state) => ({ ...state, counter: 0 })),
  on(customIncrease, (state, {value}) => ({ ...state, counter: state.counter + value })),
  on(incrementByValue, (state, action) => ({ ...state, counter: state.counter + action.value })),
  on(decrementByValue, (state, action) => ({ ...state, counter: state.counter - action.value })),
  on(welcome, (state, action) => ({ ...state, welcome: 'welcome ' + action.value }))
)

