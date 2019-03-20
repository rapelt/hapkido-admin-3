import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadChildren: './student-list/student-list.module#StudentListPageModule'
  }
];
