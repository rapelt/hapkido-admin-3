import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app-store/state/app.reducers';
import { GetAllStudents } from '../../app-store/student-state/students.actions';
import { selectSelectedStudent } from '../../app-store/student-state/students.selectors';
import { StudentModel } from '../../common/models/student';
import { GetAllClasses } from '../../app-store/classes-state/classes.actions';

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
