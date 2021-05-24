import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'list/active' },
    { path: 'list', pathMatch: 'full', redirectTo: 'list/active' },
    {
        path: 'list/:active',
        loadChildren: () =>
            import('./student-list/student-list.module').then(
                m => m.StudentListPageModule
            ),
    },
    {
        path: 'add',
        loadChildren: () =>
            import('./add-student/add-student.module').then(
                m => m.AddStudentPageModule
            ),
    },
    {
        path: 'view/:studentId',
        loadChildren: () =>
            import('./view-student/view-student.module').then(
                m => m.ViewStudentPageModule
            ),
    },
    {
        path: 'edit/:studentId',
        loadChildren: () =>
            import('./edit-student/edit-student.module').then(
                m => m.EditStudentPageModule
            ),
    },
    {
        path: 'email/:studentId',
        loadChildren: () =>
            import('./email/email.module').then(m => m.EmailPageModule),
    },
];
