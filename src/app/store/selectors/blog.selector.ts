import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IBlog } from "../models/IBlog";

const getBlogState = createFeatureSelector<IBlog[]>('blog');

export const getBlog = createSelector(getBlogState, (state) => {
  return state
});

// You can add more selectors here for loading and error states
// For now, we'll handle errors in the effects
