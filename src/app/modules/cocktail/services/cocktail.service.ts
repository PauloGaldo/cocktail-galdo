import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { COCKTAIL_API } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  protected readonly http = inject(HttpClient);
  public readonly searchType = signal<string>('');
  public readonly searchTerm = signal<string>('');

  // public readonly cocktailResource = httpResource<any>(() => ({
  //   url: `${COCKTAIL_API}search.php?s=a`,
  //   method: "GET",
  //   params: { [this.searchType()]: this.searchTerm(), },
  // }));

  getCocktailsBySearch(params: { [key: string]: string }) {
    return this.http.get(`${COCKTAIL_API}search.php`, { params: params });
  }

  getCocktailsByFilters(params: { [key: string]: string }) {
    return this.http.get(`${COCKTAIL_API}filter.php`, { params: params });
  }

}
