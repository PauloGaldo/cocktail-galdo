import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cocktail/list' },
  {
    path: '',
    loadChildren: () => import('./modules/modules.routes'),
  },
  {
    path: '**',
    redirectTo: 'cocktail/list'
  },
];
