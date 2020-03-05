import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './students-routing.module';
import { StudentsHelper } from './students.helper';

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    providers: [StudentsHelper],
})
export class StudentsModule {}
