import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTechniqueComponent } from './view-technique/view-technique.component';
import { TechniqueListComponent } from './technique-list/technique-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './techniques-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../common/common-components.module';
import { EditTechniqueComponent } from './edit-technique/edit-technique.component';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { GeneralComponent } from './edit-technique/segments/general/general.component';
import { VideosComponent } from './edit-technique/segments/videos/videos.component';
import { VideoComponent } from './edit-technique/segments/video/video.component';
import { PhotosComponent } from './edit-technique/segments/photos/photos.component';
import { PhotoComponent } from './edit-technique/segments/photo/photo.component';
import { ReviewComponent } from './edit-technique/segments/review/review.component';

@NgModule({
    declarations: [
        ViewTechniqueComponent,
        TechniqueListComponent,
        EditTechniqueComponent,
        GeneralComponent,
        VideosComponent,
        VideoComponent,
        PhotosComponent,
        PhotoComponent,
        ReviewComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CommonComponentsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
    ],
})
export class TechniquesModule {}
