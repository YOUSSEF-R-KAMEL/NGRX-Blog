import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CounterComponent } from './pages/counter/counter.component';
import { BlogPageComponent } from './pages/blog/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: '**', redirectTo: '' }
];
