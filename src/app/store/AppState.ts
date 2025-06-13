import { blogReducer } from "./reducers/blog.reducer";
import { counterReducer } from "./reducers/counter.reducer";

export const AppState = {
  counter: counterReducer,
  blog: blogReducer
}
