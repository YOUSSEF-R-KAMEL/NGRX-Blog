import { createAction, props } from "@ngrx/store";
import { IBlog } from "../models/IBlog";

export const loadBlog = createAction('loadBlog')
export const loadBlogSuccess = createAction('loadBlogSuccess', props<{ blogs: IBlog[] }>())
export const loadBlogFailure = createAction('loadBlogFailure', props<{ error: string }>())
export const addBlog = createAction('addBlog', props<IBlog>())
export const addBlogSuccess = createAction('addBlogSuccess', props<{blogInput: IBlog}>())
export const updateBlog = createAction('updateBlog', props<IBlog>())
export const updateBlogSuccess = createAction('updateBlogSuccess', props<{blogInput: IBlog}>())
export const deleteBlog = createAction('deleteBlog', props<{id: number}>())
export const deleteBlogSuccess = createAction('deleteBlogSuccess', props<{id: number}>())
