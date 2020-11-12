import { Routes } from '@angular/router';
import { TechniqueListComponent } from './technique-list-group/technique-list/technique-list.component';
import { TechniqueSetListComponent } from './technique-set-list-group/technique-set-list/technique-set-list.component';
import { ViewTechniqueComponent } from './technique-group/view-technique/view-technique.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    {
        path: 'list/:techniqueSet',
        component: TechniqueListComponent,
    },
    {
        path: 'list',
        pathMatch: 'full',
        component: TechniqueSetListComponent,
    },
    {
        path: 'view/:techniqueId',
        component: ViewTechniqueComponent,
    },
];
