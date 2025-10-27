import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { Routing } from '../core/enums/routing.enum';
import { OverlayService } from '../shared/services/overlay.service';
import { CocktailService } from './cocktail/services/cocktail.service';

@Component({
  selector: 'galdo-layout',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

  protected readonly cocktailService = inject(CocktailService);
  protected readonly router = inject(Router);
  protected readonly overlayService = inject(OverlayService);
  protected readonly translateService = inject(TranslateService);

  navigateToRandomCocktail() {
    this.overlayService.load.next(true);
    this.cocktailService
      .getRandomCocktail()
      .pipe(finalize(() => this.overlayService.load.next(false)))
      .subscribe({
        next: (response) => {
          const [cocktail] = (response as any).drinks;
          this.router.navigate([Routing.COCKTAIL_DETAIL, cocktail.idDrink]);
        }
      });
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }

}
