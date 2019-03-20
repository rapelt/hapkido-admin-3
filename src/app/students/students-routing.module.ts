import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    redirectTo: 'students'
  },
  {
    path: 'students',
    loadChildren: './students/student-list/student-list.module#StudentListPageModule'
  }
];
