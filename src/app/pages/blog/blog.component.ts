import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from '../../Components/blog/blog.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, BlogComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogPageComponent {}
