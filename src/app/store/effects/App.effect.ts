import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { showAlert, showErrorAlert, loadBlogFailure } from "../actions/blog.action";
import { tap } from "rxjs";
import { BlogService } from "../services/blog.service";

@Injectable()
export class AppEffect {
  actions$ = inject(Actions);
  blogService = inject(BlogService);
  toastr = inject(ToastrService);

  showAlert$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showAlert),
        tap(({ message }) => {
          this.toastr.success(message, 'Success!');
        })
      ),
    { dispatch: false }
  );

  showErrorAlert$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showErrorAlert),
        tap(({ message }) => {
          this.toastr.error(message, 'Error!');
        })
      ),
    { dispatch: false }
  );

  // loadBlogFailure$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(loadBlogFailure),
  //       tap(({ error }) => {
  //         this.toastr.error(`Failed to load blogs: ${error}`, 'Error!');
  //       })
  //     ),
  //   { dispatch: false }
  // );

  showAlert(message: string, actionResult = 'success') {
    if (actionResult === 'success') {
      this.toastr.success(message, 'Success!');
    } else {
      this.toastr.error(message, 'Error!');
    }
  }
}
