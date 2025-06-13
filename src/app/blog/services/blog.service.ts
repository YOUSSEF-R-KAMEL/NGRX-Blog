import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from '../../store/models/IBlog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private _httpClient = inject(HttpClient)
  getBlog(): Observable<IBlog[]>{
    return this._httpClient.get<IBlog[]>("http://localhost:3000/blogs");
  }
}
