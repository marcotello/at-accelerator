import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvShowTableSpinnerService {

  private searching = signal(false);

  readonly showSpinnerSignal = this.searching.asReadonly();

  showSpinner(): void {
    this.searching.set(true);
  }

  hideSpinner(): void {
    this.searching.set(false);
  }
}
