import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRouter } from "./customSerializer";
import { RouterReducerState } from "@ngrx/router-store";

const getRouterState = createFeatureSelector<RouterReducerState<IRouter>>('Router');

export const getRouterInfo = createSelector(getRouterState, (state) => {
  return state.state.params['user']
});
