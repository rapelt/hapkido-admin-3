import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MessagesModule } from '../../messages/messages.module';

import { SignInPage } from './sign-in.page';
import {AuthLibModule} from 'hapkido-auth-lib';

const routes: Routes = [
  {
    path: '',
    component: SignInPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        MessagesModule,
        AuthLibModule
    ],
  declarations: [SignInPage]
})
export class SignInPageModule {}
