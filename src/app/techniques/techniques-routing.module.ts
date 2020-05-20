import { Routes } from '@angular/router';
import { TechniqueListComponent } from './technique-list/technique-list.component';
import { ViewTechniqueComponent } from './view-technique/view-technique.component';
import { EditTechniqueComponent } from './edit-technique/edit-technique.component';
import { AddGradingComponent } from '../gradings/add-grading/add-grading.component';
import { GeneralComponent } from './edit-technique/segments/general/general.component';
import { VideosComponent } from './edit-technique/segments/videos/videos.component';
import { VideoComponent } from './edit-technique/segments/video/video.component';
import { PhotosComponent } from './edit-technique/segments/photos/photos.component';
import { PhotoComponent } from './edit-technique/segments/photo/photo.component';
import { ReviewComponent } from './edit-technique/segments/review/review.component';
import { TechniquesDataDispatcher } from './techniques-data.resolver';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    {
        path: 'list',
        component: TechniqueListComponent,
        // resolve: { data: TechniquesDataDispatcher },
    },
    {
        path: 'view/:techniqueId',
        component: ViewTechniqueComponent,
    },
    {
        path: 'edit/:techniqueId',
        component: EditTechniqueComponent,
        // resolve: { data: TechniquesDataDispatcher },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'general',
            },
            {
                path: 'general',
                component: GeneralComponent,
            },
            {
                path: 'videos',
                component: VideosComponent,
            },
            {
                path: 'video/new',
                component: VideoComponent,
            },
            {
                path: 'video/:id',
                component: VideoComponent,
            },
            {
                path: 'photos',
                component: PhotosComponent,
            },
            {
                path: 'photo/new',
                component: PhotoComponent,
            },
            {
                path: 'photo/:id',
                component: PhotoComponent,
            },
            {
                path: 'review',
                component: ReviewComponent,
            },
        ],
    },
];
