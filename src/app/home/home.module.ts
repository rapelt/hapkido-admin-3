import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MessagesModule } from '../messages/messages.module';

import { HomePage } from './home.page';
import { AuthLibModule } from 'hapkido-auth-lib';
import { CommonComponentsModule } from '../common/common-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MessagesModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage,
            },
        ]),
        CommonComponentsModule,
    ],
    declarations: [HomePage],
})
export class HomePageModule {}
