import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlog } from '../models/IBlog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blogs';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(this.apiUrl);
  }

  addBlog(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.apiUrl, blog);
  }

  updateBlog(blog: IBlog): Observable<IBlog> {
    return this.http.put<IBlog>(`${this.apiUrl}/${blog.id}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
