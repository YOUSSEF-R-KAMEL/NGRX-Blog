import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BlogService } from '../services/blog.service';
import { loadBlog, loadBlogSuccess, loadBlogFailure, addBlog, addBlogSuccess, updateBlog, updateBlogSuccess, deleteBlog, deleteBlogSuccess } from '../actions/blog.action';
import { IBlog } from './../models/IBlog';

@Injectable()
export class BlogEffects {
  actions$ = inject(Actions)
  blogService = inject(BlogService)

  loadBlogs$ = createEffect(() => this.actions$.pipe(
    ofType(loadBlog),
    exhaustMap(() => this.blogService.getBlogs()
      .pipe(
        map(blogs => loadBlogSuccess({ blogs })),
        catchError(error => of(loadBlogFailure({ error: error.message })))
      ))
  ));

  addBlog$ = createEffect(() => this.actions$.pipe(
    ofType(addBlog),
    exhaustMap((action) => this.blogService.addBlog(action)
      .pipe(
        map(blog => addBlogSuccess({blogInput: action}))
      ))
  ));

  updateBlog$ = createEffect(() => this.actions$.pipe(
    ofType(updateBlog),
    exhaustMap((action) => this.blogService.updateBlog(action)
      .pipe(
        map(blog => updateBlogSuccess({blogInput: action})),
        catchError(error => of(loadBlogFailure({ error: error.message })))
      ))
  ));
 deleteBlog$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBlog),
    exhaustMap((action) => this.blogService.deleteBlog(action.id)
      .pipe(
        map(blog => deleteBlogSuccess({id: action.id})),
        catchError(error => of(loadBlogFailure({ error: error.message })))
      ))
  ));
}