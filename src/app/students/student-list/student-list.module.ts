import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../common/common-components.module';
import { StudentListPopoverComponent } from '../components/student-list-popover/student-list-popover.component';
import { StudentListPage } from './student-list.page';

const routes: Routes = [
  {
    path: '',
    component: StudentListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonComponentsModule
  ],
  entryComponents: [
    StudentListPopoverComponent
  ],
  declarations: [StudentListPage, StudentListPopoverComponent]
})
export class StudentListPageModule {}
