import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StudentListComponent } from './components/student-list/student-list.component';
import { GradeHelper } from './helper/grade/grade';
import { AlphabeticalStudentsPipe } from './pipes/alphabeticalstudents/alphabeticalstudents';
import { CapitialisePipe } from './pipes/capitialise.pipe';
import { GradeBadgeComponent } from './components/grade-badge/grade-badge.component';

@NgModule({
  declarations: [StudentListComponent, CapitialisePipe, AlphabeticalStudentsPipe, GradeBadgeComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  providers: [
    GradeHelper
  ],
  exports: [
    StudentListComponent,
    CapitialisePipe,
    CommonModule,
    AlphabeticalStudentsPipe,
    GradeBadgeComponent
  ]
})
export class CommonComponentsModule { }
