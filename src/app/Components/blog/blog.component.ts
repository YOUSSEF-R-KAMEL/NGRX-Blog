import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { IBlog } from '../../store/models/IBlog';
import { SpinnerService } from '../../shared/services/spinner.service';
import { getBlog } from '../../store/selectors/blog.selector';
import { addBlog, deleteBlog, loadBlog, updateBlog } from '../../store/actions/blog.action';

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
  toastr = inject(ToastrService);
  spinnerService = inject(SpinnerService);
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
      // You can also show a toastr notification directly here if needed
      // this.toastr.info('Blog is being added...', 'Info');
    } else {
      this.toastr.warning('Please fill in both title and description', 'Warning');
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
    } else {
      this.toastr.warning('Please fill in both title and description', 'Warning');
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
        this.toastr.info('Delete operation cancelled', 'Info');
      },
    });
  }

  // Retry connection to JSON Server
  retryConnection() {
    this.hasError = false;
    this.errorMessage = '';
    this.spinnerService.showWithMessage('Reconnecting to server...');
    this.store.dispatch(loadBlog());
    this.toastr.info('Attempting to reconnect...', 'Info');
  }
}
