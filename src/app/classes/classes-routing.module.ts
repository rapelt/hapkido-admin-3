import { Routes } from '@angular/router';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassesPage } from './classes.page';
import { EditClassComponent } from './edit-class/edit-class.component';
import { ViewClassComponent } from './view-class/view-class.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/class/list',
    },
    {
        path: 'list',
        component: ClassesPage,
    },
    {
        path: 'add',
        component: AddClassComponent,
    },
    {
        path: 'view/:classId',
        component: ViewClassComponent,
    },
    {
        path: 'edit/:classId',
        component: EditClassComponent,
    },
];
