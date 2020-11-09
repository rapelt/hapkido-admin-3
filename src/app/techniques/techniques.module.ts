import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTechniqueComponent } from './view-technique/view-technique.component';
import { TechniqueListComponent } from './technique-list/technique-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './techniques-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../common/common-components.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';
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
