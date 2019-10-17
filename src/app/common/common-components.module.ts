import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule, IonItemSliding} from '@ionic/angular';
import { StudentListComponent } from './components/student-list/student-list.component';
import { GradeHelper } from './helper/grade/grade';
import { AlphabeticalFamilyPipe } from './pipes/alphabetical-family.pipe';
import { AlphabeticalStudentsPipe } from './pipes/alphabeticalstudents/alphabeticalstudents';
import { CapitialisePipe } from './pipes/capitialise.pipe';
import { GradeBadgeComponent } from './components/grade-badge/grade-badge.component';
import { ValidationErrorMessageComponent } from './components/validation-error-message/validation-error-message.component';
import { OrderDatesPipe } from './pipes/order-dates.pipe';
import { MissedClassWarningComponent } from './components/missed-class-warning/missed-class-warning.component';

@NgModule({
  declarations: [
    StudentListComponent,
    CapitialisePipe,
    AlphabeticalStudentsPipe,
    GradeBadgeComponent,
    AlphabeticalFamilyPipe,
    ValidationErrorMessageComponent,
    OrderDatesPipe,
    MissedClassWarningComponent],
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
    AlphabeticalFamilyPipe,
    GradeBadgeComponent,
    ValidationErrorMessageComponent,
    OrderDatesPipe,
    MissedClassWarningComponent
  ]
})
export class CommonComponentsModule { }
