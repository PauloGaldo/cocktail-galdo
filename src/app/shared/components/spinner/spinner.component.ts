import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'galdo-spinner',
  imports: [
    MatProgressSpinnerModule,
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  public readonly size = input<'lg' | 'md'>('lg');
}
