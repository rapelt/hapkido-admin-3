import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../common/common-components.module';
import { ViewStudentDatesComponent } from './segments/view-student-dates/view-student-dates.component';
import { ViewStudentPaymentsComponent } from './segments/view-student-payments/view-student-payments.component';
import { ViewStudentPage } from './view-student.page';
import { ViewStudentGeneralComponent } from './segments/view-student-general/view-student-general.component';

const routes: Routes = [
    {
        path: '',
        component: ViewStudentPage,
    },
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
    declarations: [
        ViewStudentPage,
        ViewStudentGeneralComponent,
        ViewStudentDatesComponent,
        ViewStudentPaymentsComponent,
    ],
})
export class ViewStudentPageModule {}
