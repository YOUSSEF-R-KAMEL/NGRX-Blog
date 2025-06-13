import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICounter } from "../models/ICounter";

export const getCounterState = createFeatureSelector<ICounter>('counter');

export const getCounter = createSelector(getCounterState, state => {
  return state
})
