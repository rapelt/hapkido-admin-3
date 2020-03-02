import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentModel } from '../../../../common/models/student';
import { AppState } from '../../../../state/app.reducers';
import {
    selectSelectedStudent,
    selectSelectedStudentFamilyMembers,
    selectSelectedStudentsLastClass,
} from '../../../state/students.selectors';
import {
    ActivateStudent,
    DeactivateStudent,
} from '../../../state/students.actions';

@Component({
    selector: 'app-view-student-general',
    templateUrl: './view-student-general.component.html',
    styleUrls: ['./view-student-general.component.scss'],
})
export class ViewStudentGeneralComponent implements OnInit {
    @Input()
    studentId: string;

    student: Observable<any>;
    studentLastClass: Observable<any>;
    studentFamily: Observable<any>;

    lastClassIsTooLongAgo = false;

    timeSinceLastClass;

    constructor(public store: Store<AppState>) {}

    ngOnInit() {
        this.student = this.store.select(selectSelectedStudent(this.studentId));
        this.studentFamily = this.store.select(
            selectSelectedStudentFamilyMembers(this.studentId)
        );
        this.studentLastClass = this.store.select(
            selectSelectedStudentsLastClass(this.studentId)
        );
    }

    deactivateStudent() {
        this.store.dispatch(new DeactivateStudent(this.studentId));
    }

    activateStudent() {
        this.store.dispatch(new ActivateStudent(this.studentId));
    }
}
