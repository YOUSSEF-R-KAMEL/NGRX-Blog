import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  exhaustMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { BlogService } from '../services/blog.service';
import {
  loadBlog,
  loadBlogSuccess,
  loadBlogFailure,
  addBlog,
  addBlogSuccess,
  updateBlog,
  updateBlogSuccess,
  deleteBlog,
  deleteBlogSuccess,
  showAlert,
  showErrorAlert,
} from '../actions/blog.action';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../shared/services/spinner.service';

@Injectable()
export class BlogEffects {
  actions$ = inject(Actions);
  blogService = inject(BlogService);
  toastr = inject(ToastrService);
  spinnerService = inject(SpinnerService);

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlog),
      tap(() => this.spinnerService.showWithMessage('Loading blogs...')),
      exhaustMap(() =>
        this.blogService.getBlogs().pipe(
          map((blogs) => {
            this.spinnerService.hide();
            return loadBlogSuccess({ blogs });
          }),
          catchError((error) => {
            this.spinnerService.hide();
            return of(loadBlogFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBlog),
      tap(() => this.spinnerService.showWithMessage('Adding blog...')),
      exhaustMap((action) =>
        this.blogService
          .addBlog(action)
          .pipe(
            switchMap((blog) => {
              this.spinnerService.hide();
              return [
                addBlogSuccess({ blogInput: action }),
                showAlert({ message: 'Blog added successfully!' }),
              ];
            }),
            catchError((error) => {
              this.spinnerService.hide();
              return [
                loadBlogFailure({ error: error.message }),
                showErrorAlert({ message: 'Failed to add blog!' })
              ];
            })
          )
      )
    )
  );

  updateBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBlog),
      tap(() => this.spinnerService.showWithMessage('Updating blog...')),
      exhaustMap((action) =>
        this.blogService.updateBlog(action).pipe(
          switchMap((blog) => {
            this.spinnerService.hide();
            return [
              updateBlogSuccess({ blogInput: action }),
              showAlert({ message: 'Blog updated successfully!' }),
            ];
          }),
          catchError((error) => {
            this.spinnerService.hide();
            return [
              loadBlogFailure({ error: error.message }),
              showErrorAlert({ message: 'Failed to update blog!' })
            ];
          })
        )
      )
    )
  );

  deleteBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBlog),
      tap(() => this.spinnerService.showWithMessage('Deleting blog...')),
      exhaustMap((action) =>
        this.blogService.deleteBlog(action.id).pipe(
          switchMap((blog) => {
            this.spinnerService.hide();
            return [
              deleteBlogSuccess({ id: action.id }),
              showAlert({ message: 'Blog deleted successfully!' }),
            ];
          }),
          catchError((error) => {
            this.spinnerService.hide();
            return [
              loadBlogFailure({ error: error.message }),
              showErrorAlert({ message: 'Failed to delete blog!' })
            ];
          })
        )
      )
    )
  );
}
