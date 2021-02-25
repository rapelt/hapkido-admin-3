import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphsPageRoutingModule } from './graphs-routing.module';

import { GraphsPage } from './graphs.page';
import { HotTableModule } from '@handsontable/angular';
import { GraphDataService } from './graph-data.service';
import { CommonComponentsModule } from '../common/common-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        GraphsPageRoutingModule,
        HotTableModule,
        CommonComponentsModule,
    ],
    providers: [GraphDataService],
    declarations: [GraphsPage],
})
export class GraphsPageModule {}
