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
import { DragDropDirective } from '../common/directives/drag-drop.directive';
import { TechniquesDataDispatcher } from './techniques-data.resolver';
import { TechniqueSetListComponent } from './technique-set-list/technique-set-list.component';
import { AddTechniqueComponent } from './add-technique/add-technique.component';
import { AddTechniqueSetComponent } from './add-technique-set/add-technique-set.component';
import { PopoverMenuComponent } from './technique-set-list/popover-menu/popover-menu.component';

@NgModule({
    declarations: [
        ViewTechniqueComponent,
        TechniqueListComponent,
        TechniqueSetListComponent,
        EditTechniqueComponent,
        GeneralComponent,
        VideosComponent,
        VideoComponent,
        PhotosComponent,
        PhotoComponent,
        ReviewComponent,
        AddTechniqueComponent,
        AddTechniqueSetComponent,
        PopoverMenuComponent,
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
    providers: [TechniquesDataDispatcher],
})
export class TechniquesModule {}
