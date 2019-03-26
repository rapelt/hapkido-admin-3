import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    redirectTo: 'list/active'
  },
  { path: 'list',
    pathMatch: 'full',
    redirectTo: 'list/active'
  },
  {
    path: 'list/:active',
    loadChildren: './student-list/student-list.module#StudentListPageModule',
  },
];
