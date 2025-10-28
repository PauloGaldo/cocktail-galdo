import { Component, computed, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs';
import { Routing } from '../../../../core/enums/routing.enum';
import { DrinkUtils } from '../../../../core/utils/drink.utils';
import { MobileUtils } from '../../../../core/utils/mobile.utils';
import { OverlayService } from '../../../../shared/services/overlay.service';
import { CocktailService } from '../../services/cocktail.service';
import { CocktailCategoryDialogComponent } from '../dialogs/cocktail-category-dialog/cocktail-category-dialog.component';

@Component({
  selector: 'galdo-cocktail-details',
  imports: [
    TranslateModule,
    MatChipsModule,
  ],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss',
})
export class CocktailDetailsComponent implements OnInit {

  protected readonly cocktailService = inject(CocktailService);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly translateService = inject(TranslateService);
  protected readonly overlayService = inject(OverlayService);
  protected readonly matDialog = inject(MatDialog);
  protected readonly router = inject(Router);
  protected readonly cocktail: WritableSignal<any> = signal(null);
  protected readonly ingredients: WritableSignal<any> = signal(null);
  protected readonly currentLanguage = toSignal(this.translateService.onLangChange);
  protected readonly instructions = computed(() => {
    const currentLanguage = this.currentLanguage();
    return currentLanguage?.lang === 'es'
      ? this.cocktail()?.strInstructionsES || this.cocktail()?.strInstructions
      : this.cocktail()?.strInstructions;
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const cocktailId = params.get('id');
        if (cocktailId) {
          this.getCocktailById(cocktailId);
        } else {
          this.router.navigate([Routing.COCKTAIL_LIST]);
        }
      });
  }

  protected getCocktailById(cocktailId: string): void {
    this.cocktailService
      .getCocktailById(cocktailId)
      .subscribe({
        next: (response: any) => {
          const [cocktail] = response.drinks;
          this.ingredients.set(DrinkUtils.getIngredientList(cocktail));
          this.cocktail.set(cocktail);
        },
        error: () => {
          this.router.navigate([Routing.COCKTAIL_LIST]);
        }
      });
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

}
