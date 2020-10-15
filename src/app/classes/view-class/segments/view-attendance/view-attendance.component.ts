import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClassModel } from '../../../../common/models/class';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../../../app-store/state/app.reducers';
import { GetAllStudents } from '../../../../app-store/student-state/students.actions';
import {
    ActionTypes,
    GetAllClasses,
} from '../../../../app-store/classes-state/classes.actions';
import { selectSelectedClass } from '../../../../app-store/classes-state/classes.selectors';
import { StudentModel } from '../../../../common/models/student';
import { selectStudentsWhoAttendedClass } from '../../../../app-store/student-state/students.selectors';

@Component({
    selector: 'app-view-attendance',
    templateUrl: './view-attendance.component.html',
    styleUrls: ['./view-attendance.component.scss'],
})
export class ViewAttendanceComponent implements OnInit, OnDestroy {
    classId: string;
    subsc;
    subsc1;
    aclass: ClassModel;

    attendance: StudentModel[] = [];

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public store: Store<AppState>
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetAllStudents());
        this.store.dispatch(new GetAllClasses());

        this.subsc = this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.classId = params.get('classId');
                this.subsc1 = this.store
                    .select(selectSelectedClass(this.classId))
                    .subscribe((aclass: ClassModel) => {
                        if (aclass == null) {
                            return;
                        }

                        this.aclass = aclass;

                        this.getStudentsNames(aclass.attendance);
                    });
            }
        );
    }

    getStudentsNames(studentIds: string[]): StudentModel[] {
        this.store
            .select(selectStudentsWhoAttendedClass(studentIds))
            .subscribe(studentsArray => {
                this.attendance = studentsArray;
            });
        return;
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
        this.subsc1.unsubscribe();
    }
}
