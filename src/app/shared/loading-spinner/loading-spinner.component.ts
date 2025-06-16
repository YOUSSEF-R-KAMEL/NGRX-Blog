import { Component, inject } from '@angular/core';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  private spinner = inject(NgxSpinnerService);
  private store = inject(Store);

  ngOnInit() {
    // You can show spinner on app initialization if needed
    // this.spinner.show();
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
}
