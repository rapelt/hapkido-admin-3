import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './techniques-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../common/common-components.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { TechniquesDataDispatcher } from './techniques-data.resolver';
import { TechniqueSetListComponent } from './technique-set-list-group/technique-set-list/technique-set-list.component';
import { AddTechniqueComponent } from './technique-list-group/add-technique/add-technique.component';
import { AddTechniqueSetComponent } from './technique-set-list-group/add-technique-set/add-technique-set.component';
import { PopoverMenuComponent } from './common/popover-menu/popover-menu.component';
import { ViewTechniqueComponent } from './technique-group/view-technique/view-technique.component';
import { TechniqueListComponent } from './technique-list-group/technique-list/technique-list.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { FilePickerComponent } from './common/file-picker/file-picker.component';
import { MediaIconComponent } from './common/media-icon/media-icon.component';
import { SidePanelComponent } from './common/side-panel/side-panel.component';
import { UploadBarComponent } from './common/upload-bar/upload-bar.component';

@NgModule({
    declarations: [
        ViewTechniqueComponent,
        TechniqueListComponent,
        TechniqueSetListComponent,
        AddTechniqueComponent,
        AddTechniqueSetComponent,
        PopoverMenuComponent,
        BreadcrumbComponent,
        FilePickerComponent,
        MediaIconComponent,
        SidePanelComponent,
        UploadBarComponent,
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
