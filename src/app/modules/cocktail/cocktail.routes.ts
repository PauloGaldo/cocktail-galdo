import { Routes } from "@angular/router";
import { CocktailListComponent } from "./components/cocktail-list/cocktail-list.component";

export default [
  {
    path: 'list',
    component: CocktailListComponent,
  }
] as Routes;