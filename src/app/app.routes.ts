import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    redirectTo: 'cocktail/list'
  },
  {
    path: '',
    loadChildren: () => import('./modules/modules.routes')
  },
];
