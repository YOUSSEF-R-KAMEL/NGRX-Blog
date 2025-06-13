import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BlogService } from "../../blog/services/blog.service";
import { loadBlogSuccess } from "../actions/blog.action";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class BlogEffect {
  action$ = inject(Actions);
  _blogService= inject(BlogService);

  _blog = createEffect(() =>
    this.action$.pipe(
      ofType(loadBlogSuccess),
      exhaustMap((action) => {
        return this._blogService.getBlog().pipe(
          map((data) => {
            return loadBlogSuccess({blogList: data});
          }),
          catchError(() => EMPTY)
        )
      })
    )
  )
}