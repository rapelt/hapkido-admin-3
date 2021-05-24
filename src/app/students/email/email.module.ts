import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailPageRoutingModule } from './email-routing.module';

import { EmailPage } from './email.page';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../../common/common-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EmailPageRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonComponentsModule,
    ],
    declarations: [EmailPage],
})
export class EmailPageModule {}
