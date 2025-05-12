import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private defaultConfig = {
    type: '',
    bdColor: 'rgba(0, 0, 0, 0.8)',
  };

  constructor(private spinner: NgxSpinnerService) {}

  show() {
    this.spinner.show(undefined, this.defaultConfig);
  }

  hide() {
    this.spinner.hide();
  }
}