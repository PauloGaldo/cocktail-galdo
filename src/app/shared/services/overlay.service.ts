import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { map, scan, Subject } from 'rxjs';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private spinnerTopRef: OverlayRef | null = null;
  private overlay = inject(Overlay);
  public load: Subject<boolean> = new Subject();

  constructor() {
    this.load
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0),
      )
      .subscribe(
        (res) => {
          if (res === 1) {
            this.spinnerTopRef?.hasAttached() ? void 0 : this.showSpinner();
          }
          else if (res == 0) {
            this.spinnerTopRef?.hasAttached() ? this.stopSpinner() : void 0;
          }
        },
      );
  }

  private showSpinner() {
    if (!this.spinnerTopRef) {
      this.spinnerTopRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      });
    }
    this.spinnerTopRef.attach(new ComponentPortal(SpinnerComponent));
  }

  private stopSpinner() {
    this.spinnerTopRef?.detach();
  }

}
