import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export default [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'cocktail',
        loadChildren: () => import('./cocktail/cocktail.routes')
      }
    ]
  }
] as Routes;
