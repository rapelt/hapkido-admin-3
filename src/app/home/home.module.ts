import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MessagesModule } from '../messages/messages.module';

import { HomePage } from './home.page';
import {AuthLibModule} from 'hapkido-auth-lib';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MessagesModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
