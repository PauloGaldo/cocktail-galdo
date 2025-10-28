import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'galdo-cocktail-ingredients-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './cocktail-ingredients-dialog.component.html',
  styleUrl: './cocktail-ingredients-dialog.component.scss',
})
export class CocktailIngredientsDialogComponent {

  protected readonly data = inject(MAT_DIALOG_DATA);

}
