import { AfterViewInit, Component, computed, inject, OnInit, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, map, of, switchMap, tap } from 'rxjs';
import { DrinkUtils } from '../../../../core/utils/drink.utils';
import { MobileUtils } from '../../../../core/utils/mobile.utils';
import { CustomPaginatorAdapter } from '../../../../shared/adapters/custom-paginator.adapter';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { MatTableResponsiveDirective } from '../../../../shared/directives/mat-table-responsive.directive';
import { OverlayService } from '../../../../shared/services/overlay.service';
import { CocktailService } from '../../services/cocktail.service';
import { CocktailCategoryDialogComponent } from '../dialogs/cocktail-category-dialog/cocktail-category-dialog.component';
import { CocktailIngredientsDialogComponent } from '../dialogs/cocktail-ingredients-dialog/cocktail-ingredients-dialog.component';

@Component({
  selector: 'galdo-cocktail-list',
  imports: [
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableResponsiveDirective,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorAdapter },
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss',
})
export class CocktailListComponent implements OnInit, AfterViewInit {
  protected readonly paginator = viewChild.required(MatPaginator);
  protected readonly cocktailService = inject(CocktailService);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly matDialog = inject(MatDialog);
  protected readonly overlayService = inject(OverlayService);
  protected readonly searchForm: Signal<FormGroup> = signal(this.formBuilder.group({
    name: [''],
    ingredient: [''],
  }));
  protected readonly loading: WritableSignal<boolean> = signal(false);
  protected readonly dataSource: Signal<MatTableDataSource<any>> = signal(new MatTableDataSource<any>([]));
  protected readonly displayedColumns: Signal<string[]> = signal(['id', 'image', 'name', 'category', 'type', 'ingredientsQuantity', 'modifiedDate']);
  protected readonly cocktails: WritableSignal<any[]> = signal([]);
  protected readonly nonAlcoholicCocktails = computed(() =>
    this.cocktails().filter((cocktail: any) => cocktail.strAlcoholic === 'Non alcoholic').length
  );
  protected readonly alcoholicCocktails = computed(() =>
    this.cocktails().filter((cocktail: any) => cocktail.strAlcoholic === 'Alcoholic').length
  );

  public ngOnInit(): void {
    this.onSearch();
  }

  public ngAfterViewInit(): void {
    this.dataSource().paginator = this.paginator();
  }

  protected onSearch(): void {
    of(this.buildSearchParams(this.searchForm()))
      .pipe(
        tap(() => this.loading.set(true)),
        switchMap((params) => {
          if (Object.keys(params).length) {
            return this.cocktailService.getCocktailsBySearch(this.buildSearchParams(this.searchForm()));
          }
          return of({ drinks: [] });
        }),
        map((data: any) => {
          data.drinks?.forEach((drink: any) => {
            const ingredientCount = Object.keys(drink).filter((key: any) => key.startsWith('strIngredient') && drink[key]).length;
            drink.ingredientCount = ingredientCount;
          });
          return data.drinks;
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (drinks: any) => {
          this.cocktails.set(drinks || []);
          this.dataSource().data = this.cocktails();
        },
        error: (error) => {
          console.error(error);
          this.loading.set(false);
        },
      });
  }

  protected buildSearchParams(form: FormGroup): any {
    if (form.get('name')?.value?.length === 1) {
      return { f: form.get('name')?.value };
    } else if (form.get('name')?.value.length > 1) {
      return { s: form.get('name')?.value };
    } else if (form.get('ingredient')?.value.length > 0) {
      return { i: form.get('ingredient')?.value };
    }
    return {};
  }

  protected onCategoryClick(category: string): void {
    this.overlayService.load.next(true);
    this.cocktailService
      .getCocktailsByFilters({ c: category })
      .pipe(
        tap(() => this.overlayService.load.next(false)),
        switchMap((drinksByCategory: any) => {
          const isMobile = MobileUtils.isMobile();

          const dialogRef = this.matDialog.open(CocktailCategoryDialogComponent, {
            data: { drinks: drinksByCategory.drinks, category: category },
            width: isMobile ? '100%' : '1200px',
            height: isMobile ? '100%' : 'auto',
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: isMobile ? 'full-screen-dialog' : '',
          });
          dialogRef.afterOpened().subscribe(() => {
            if (isMobile) {
              dialogRef.updateSize('100vw', '100vh');
            }
          });

          return dialogRef.afterClosed();
        }),
      )
      .subscribe();
  }

  protected onIngredientClick(drink: any): void {
    of(DrinkUtils.getIngredientList(drink))
      .pipe(
        switchMap((ingredients: any) => {
          const isMobile = MobileUtils.isMobile();
          const dialogRef = this.matDialog.open(CocktailIngredientsDialogComponent, {
            data: { ingredients, drinkName: drink.strDrink },
            width: isMobile ? '100%' : '600px',
            height: isMobile ? '100%' : 'auto',
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: isMobile ? 'full-screen-dialog' : '',
          });
          dialogRef.afterOpened().subscribe(() => {
            if (isMobile) {
              dialogRef.updateSize('100vw', '100vh');
            }
          });

          return dialogRef.afterClosed();
        }),
      ).subscribe();
  }

}
