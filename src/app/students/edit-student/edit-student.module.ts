import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditStudentPage } from './edit-student.page';
import {CommonComponentsModule} from '../../common/common-components.module';
import {CapitialisePipe} from '../../common/pipes/capitialise.pipe';

const routes: Routes = [
  {
    path: '',
    component: EditStudentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonComponentsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CapitialisePipe
  ],
  declarations: [EditStudentPage]
})
export class EditStudentPageModule {}
