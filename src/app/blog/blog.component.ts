import { Component, inject } from '@angular/core';
import { IBlog } from '../store/models/IBlog';
import { Store } from '@ngrx/store';
import { getBlog } from '../store/selectors/blog.selector';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  addBlog,
  updateBlog,
  deleteBlog,
  loadBlog,
} from '../store/actions/blog.action';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-blog',
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    FormsModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  providers: [ConfirmationService],
})
export class BlogComponent {
  store = inject(Store<IBlog[]>);
  confirmationService = inject(ConfirmationService);
  blogList: IBlog[] = [];
  hasError = false;
  errorMessage = '';

  // Add dialog properties
  displayDialog = false;
  newBlog: IBlog = {
    id: 0,
    title: '',
    description: '',
  };

  // Edit dialog properties
  displayEditDialog = false;
  editingBlog: IBlog = {
    id: 0,
    title: '',
    description: '',
  };

  ngOnInit(): void {
    // Load blogs from JSON Server
    this.store.dispatch(loadBlog());

    this.store.select(getBlog).subscribe((data) => {
      if (data && data.length > 0) {
        this.blogList = data;
        this.hasError = false;
      } else {
        this.hasError = true;
        this.errorMessage = 'Unable to connect to server. Please check if JSON Server is running on port 3000.';
      }
    });
  }

  // Open add dialog
  showAddBlogDialog() {
    this.displayDialog = true;
    this.newBlog = {
      id: this.blogList.length + 1,
      title: '',
      description: ''
    };
  }

  // Close add dialog
  hideDialog() {
    this.displayDialog = false;
    this.newBlog = {
      id: 0,
      title: '',
      description: ''
    };
  }

  // Save new blog
  saveBlog() {
    if (this.newBlog.title && this.newBlog.description) {
      this.store.dispatch(addBlog(this.newBlog))
      console.log('New blog to add:', this.newBlog);
      this.hideDialog();
    }
  }

  // Open edit dialog
  showEditBlogDialog(blog: IBlog) {
    this.displayEditDialog = true;
    this.editingBlog = { ...blog }; // Create a copy to avoid direct mutation
  }

  // Close edit dialog
  hideEditDialog() {
    this.displayEditDialog = false;
    this.editingBlog = {
      id: 0,
      title: '',
      description: ''
    };
  }

  // Save edited blog
  saveEditedBlog() {
    if (this.editingBlog.title && this.editingBlog.description) {
      this.store.dispatch(updateBlog(this.editingBlog));
      console.log('Edited blog to save:', this.editingBlog);
      this.hideEditDialog();
    }
  }

  // Show delete confirmation dialog
  deleteBlog(blog: IBlog) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${blog.title}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteBlog({ id: blog.id }));
        console.log('Blog deleted:', blog);
      },
      reject: () => {
        // User cancelled deletion
        console.log('Delete cancelled');
      },
    });
  }

  // Retry connection to JSON Server
  retryConnection() {
    this.hasError = false;
    this.errorMessage = '';
    this.store.dispatch(loadBlog());
  }
}
