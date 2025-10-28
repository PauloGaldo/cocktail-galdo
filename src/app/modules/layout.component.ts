import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { Routing } from '../core/enums/routing.enum';
import { OverlayService } from '../shared/services/overlay.service';
import { CocktailService } from './cocktail/services/cocktail.service';

@Component({
  selector: 'galdo-layout',
  imports: [
    TranslateModule,
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
  protected readonly platformId = inject(PLATFORM_ID);
  protected readonly selectedLanguage = signal<string>((() => {
    if (isPlatformBrowser(this.platformId)) {
      const storedLang = localStorage.getItem('language');
      if (storedLang) {
        return storedLang;
      }
    }
    return this.translateService.getCurrentLang() || 'en';
  })());

  ngOnInit() {
    const lang = this.selectedLanguage();
    this.translateService.use(lang);
    this.selectedLanguage.set(lang);
  }

  navigateToRandomCocktail() {
    this.overlayService.load.next(true);
    this.cocktailService
      .getRandomCocktail()
      .pipe(finalize(() => this.overlayService.load.next(false)))
      .subscribe({
        next: (response) => {
          const [cocktail] = (response as any).drinks;
          const url = `${Routing.COCKTAIL_DETAIL}/${cocktail.idDrink}`;
          this.router.navigate([url], { onSameUrlNavigation: 'reload' });
        }
      });
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.selectedLanguage.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
  }

}
