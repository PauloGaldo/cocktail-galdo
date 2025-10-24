import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
    ]
  }
];
