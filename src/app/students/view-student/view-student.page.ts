import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.reducers';
import {
    GetAllStudents,
    ResetSelectedStudent,
    SetSelectedStudent,
} from '../state/students.actions';
import { selectSelectedStudent } from '../state/students.selectors';
import { StudentModel } from '../../common/models/student';
import { GetAllClasses } from '../../classes/state/classes.actions';

@Component({
    selector: 'app-view-student',
    templateUrl: './view-student.page.html',
    styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit, OnDestroy {
    studentId: string;

    student: Observable<StudentModel>;

    segment = 'general';

    activatedRouteSubscriber;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public store: Store<AppState>
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetAllStudents());
        this.store.dispatch(new GetAllClasses());

        this.activatedRouteSubscriber = this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.studentId = params.get('studentId');
                this.updateStudent();
            }
        );
    }

    updateStudent() {
        this.student = this.store.select(selectSelectedStudent(this.studentId));
    }

    ngOnDestroy() {
        this.activatedRouteSubscriber.unsubscribe();
    }

    segmentChanged(something) {
        this.segment = something.detail.value;
    }

    edit() {
        this.router.navigate(['student/edit/' + this.studentId]);
    }
}
