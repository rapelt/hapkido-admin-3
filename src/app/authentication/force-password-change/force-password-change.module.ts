import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForcePasswordChangePage } from './force-password-change.page';

const routes: Routes = [
  {
    path: '',
    component: ForcePasswordChangePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForcePasswordChangePage]
})
export class ForcePasswordChangePageModule {}
