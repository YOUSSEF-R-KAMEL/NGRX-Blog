import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinner = inject(NgxSpinnerService);

  show(name: string = 'primary') {
    this.spinner.show(name, {
      type: 'ball-pulse',
      size: 'large',
      bdColor: '#FFF',
      color: '#fff',
      fullScreen: true
    });
  }

  hide(name: string = 'primary') {
    this.spinner.hide(name);
  }

  showWithMessage(message: string, name: string = 'primary') {
    this.spinner.show(name, {
      type: 'ball-pulse',
      size: 'large',
      bdColor: '#FFF',
      color: '#fff',
      fullScreen: true,
      template: `<p style="color: white; font-size: 18px; margin-top: 20px;">${message}</p>`
    });
  }
}
