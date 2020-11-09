import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../common/common-components.module';
import { routes } from './classes-routing.module';
import { ClassesHelper } from './classes.helper';
import { ClassesPage } from './classes.page';
import { AddClassComponent } from './add-class/add-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { ViewClassComponent } from './view-class/view-class.component';
import { ViewAttendanceComponent } from './view-class/segments/view-attendance/view-attendance.component';
import { ClassViewGeneralComponent } from './view-class/segments/class-view-general/class-view-general.component';
import { ViewGradingComponent } from './view-class/segments/view-grading/view-grading.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CommonComponentsModule,
        ReactiveFormsModule,
    ],
    providers: [ClassesHelper],
    declarations: [
        ClassesPage,
        AddClassComponent,
        EditClassComponent,
        ViewClassComponent,
        ViewAttendanceComponent,
        ClassViewGeneralComponent,
        ViewGradingComponent,
    ],
})
export class ClassesModule {}
