import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../common/common-components.module';
import { MessagesModule } from '../../messages/messages.module';

import { AddStudentPage } from './add-student.page';

const routes: Routes = [
  {
    path: '',
    component: AddStudentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MessagesModule,
    CommonComponentsModule
  ],
  declarations: [AddStudentPage]
})
export class AddStudentPageModule {}
