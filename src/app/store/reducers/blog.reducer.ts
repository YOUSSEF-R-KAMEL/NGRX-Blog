import { createReducer, on } from "@ngrx/store";
import { blogState } from "../state/state";
import { addBlog, loadBlog, updateBlog, deleteBlog, loadBlogSuccess, loadBlogFailure, addBlogSuccess, updateBlogSuccess, deleteBlogSuccess } from "../actions/blog.action";
import { IBlog } from "../models/IBlog";

export const blogReducer = createReducer(
  blogState,
  on(loadBlog, (state) => state),
  on(loadBlogSuccess, (state, { blogs }) => blogs),
  on(loadBlogFailure, (state, { error }) => state),
  on(addBlogSuccess, (state: IBlog[], { blogInput }) => [...state, blogInput]),
  on(updateBlog, (state: IBlog[], updatedBlog: IBlog) =>
    state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
  ),
  on(updateBlogSuccess, (state: IBlog[], { blogInput }) =>
    state.map(blog => blog.id === blogInput.id ? blogInput : blog)
  ),
  on(deleteBlog, (state: IBlog[], { id }: { id: number }) =>
    state.filter(blog => blog.id !== id)
  ),
  on(deleteBlogSuccess, (state: IBlog[], { id }: { id: number }) =>
    state.filter(blog => blog.id !== id)
  )
)
