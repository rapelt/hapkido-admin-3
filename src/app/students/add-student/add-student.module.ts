import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../common/common-components.module';
import { CapitialisePipe } from '../../common/pipes/capitialise.pipe';

import { AddStudentPage } from './add-student.page';

const routes: Routes = [
    {
        path: '',
        component: AddStudentPage,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        CommonComponentsModule,
    ],
    providers: [CapitialisePipe],
    declarations: [AddStudentPage],
})
export class AddStudentPageModule {}
