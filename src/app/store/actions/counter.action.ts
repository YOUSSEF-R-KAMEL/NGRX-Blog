import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const customIncrease = createAction('customIncrease', props<{value:number}>());
export const incrementByValue = createAction('incrementByValue', props<{ value: number }>());
export const decrementByValue = createAction('decrementByValue', props<{ value: number }>());
export const welcome = createAction('welcome', props<{ value: string }>());
