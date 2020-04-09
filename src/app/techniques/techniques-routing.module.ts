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

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    {
        path: 'list',
        component: TechniqueListComponent,
    },
    {
        path: 'view/:techniqueId',
        component: ViewTechniqueComponent,
    },
    {
        path: 'edit/:techniqueId',
        component: EditTechniqueComponent,
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
                path: 'video',
                component: VideoComponent,
            },
            {
                path: 'photos',
                component: PhotosComponent,
            },
            {
                path: 'photo',
                component: PhotoComponent,
            },
            {
                path: 'review',
                component: ReviewComponent,
            },
        ],
    },
];
