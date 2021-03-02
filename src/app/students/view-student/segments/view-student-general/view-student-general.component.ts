import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentModel } from '../../../../common/models/student';
import { AppState } from '../../../../app-store/state/app.reducers';
import {
    selectSelectedStudent,
    selectSelectedStudentFamilyMembers,
    selectSelectedStudentsLastClass,
} from '../../../../app-store/student-state/students.selectors';
import {
    ActivateStudent,
    ActivateStudentInApp,
    CreateStudentLogin,
    DeactivateStudent,
    DeactivateStudentInApp,
} from '../../../../app-store/student-state/students.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-view-student-general',
    templateUrl: './view-student-general.component.html',
    styleUrls: ['./view-student-general.component.scss'],
})
export class ViewStudentGeneralComponent implements OnInit {
    @Input()
    studentId: string;

    student: Observable<StudentModel>;
    studentLastClass: Observable<any>;
    studentFamily: Observable<any>;

    lastClassIsTooLongAgo = false;

    timeSinceLastClass;

    constructor(public store: Store<AppState>, private router: Router) {}

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

    addEmail() {
        this.router.navigate(['student/email/' + this.studentId]);
    }

    editEmail() {
        this.router.navigate(['student/email/' + this.studentId]);
    }

    giveAppAccess() {
        this.store.dispatch(new CreateStudentLogin(this.studentId));
    }

    activateInApp() {
        this.store.dispatch(new ActivateStudentInApp(this.studentId));
    }

    deactivateInApp() {
        this.store.dispatch(new DeactivateStudentInApp(this.studentId));
    }
}
