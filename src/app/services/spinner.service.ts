import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public isLoading = new Subject<boolean>();
  constructor() {}

  startLoading(): void {
    this.isLoading.next(true);
  }

  stopLoading(): void {
    this.isLoading.next(false);
  }
}
