import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Routing } from '../../../../../core/enums/routing.enum';

@Component({
  selector: 'galdo-cocktail-category-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cocktail-category-dialog.component.html',
  styleUrl: './cocktail-category-dialog.component.scss',
})
export class CocktailCategoryDialogComponent {

  protected readonly data = inject(MAT_DIALOG_DATA);
  protected readonly router = inject(Router);
  protected readonly matDialog = inject(MatDialog);

  protected navigateToDetail(id: string): void {
    this.matDialog.closeAll();
    this.router.navigate([`${Routing.COCKTAIL_DETAIL}/${id}`]);
  }

}
