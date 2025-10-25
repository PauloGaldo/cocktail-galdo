import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { COCKTAIL_API } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  protected readonly http = inject(HttpClient);

  getCocktailsByFilters(params: { [key: string]: string }) {
    return this.http.get(`${COCKTAIL_API}filter.php`, { params: params });
  }

}
