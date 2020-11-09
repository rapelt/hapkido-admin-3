import { Routes } from '@angular/router';
import { TechniqueListComponent } from './technique-list/technique-list.component';
import { ViewTechniqueComponent } from './view-technique/view-technique.component';
import { TechniqueSetListComponent } from './technique-set-list/technique-set-list.component';

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
    // {
    //     path: 'edit/:techniqueId',
    //     component: EditTechniqueComponent,
    //     children: [
    //         {
    //             path: '',
    //             pathMatch: 'full',
    //             redirectTo: 'general',
    //         },
    //         {
    //             path: 'general',
    //             component: GeneralComponent,
    //         },
    //         {
    //             path: 'videos',
    //             component: VideosComponent,
    //         },
    //         {
    //             path: 'video/new',
    //             component: VideoComponent,
    //         },
    //         {
    //             path: 'video/:id',
    //             component: VideoComponent,
    //         },
    //         {
    //             path: 'photos',
    //             component: PhotosComponent,
    //         },
    //         {
    //             path: 'photo/new',
    //             component: PhotoComponent,
    //         },
    //         {
    //             path: 'photo/:id',
    //             component: PhotoComponent,
    //         },
    //         {
    //             path: 'review',
    //             component: ReviewComponent,
    //         },
    //     ],
    // },
];
