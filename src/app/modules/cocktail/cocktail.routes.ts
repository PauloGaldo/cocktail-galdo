import { Routes } from "@angular/router";
import { CocktailDetailsComponent } from "./components/cocktail-details/cocktail-details.component";
import { CocktailListComponent } from "./components/cocktail-list/cocktail-list.component";

export default [
  {
    path: 'list',
    component: CocktailListComponent,
  },
  {
    path: 'detail/:id',
    component: CocktailDetailsComponent,
  }
] as Routes;