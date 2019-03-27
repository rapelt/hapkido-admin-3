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
  { path: 'add-student', loadChildren: './add-student/add-student.module#AddStudentPageModule' },
  { path: 'view-student', loadChildren: './view-student/view-student.module#ViewStudentPageModule' },
];
