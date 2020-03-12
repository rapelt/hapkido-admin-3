import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClassModel } from '../common/models/class';
import { StudentModel } from '../common/models/student';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state/app.reducers';
import { GetAllStudents } from '../students/state/students.actions';
import {
    AddStudentToClass,
    GetAllClasses,
    RemoveStudentFromClass,
} from '../classes/state/classes.actions';
import {
    selectClassLoaded,
    selectSelectedClass,
} from '../classes/state/classes.selectors';
import {
    selectStudentLoaded,
    selectStudentsWhoAttendedClass,
    selectStudentsWhoAttendedClass2,
    selectStudentsWhoDidntAttendedClass,
} from '../students/state/students.selectors';
import { from, Observable, of } from 'rxjs';
import { classTypes } from '../common/models/class-types';
import { PageComponent } from '../common/page.component';
import { delay, map, takeWhile, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent extends PageComponent
    implements OnInit, OnDestroy {
    classId: string;

    aclass: ClassModel;

    segment = 'studentsAttended';
    classTypes = classTypes;
    attendance: StudentModel[] = [];
    notAttendance: StudentModel[] = [];

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public store: Store<AppState>
    ) {
        super();
    }

    ngOnInit() {
        this.store.dispatch(new GetAllStudents());
        this.store.dispatch(new GetAllClasses());

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get('classId');
            this.store
                .select(selectSelectedClass(this.classId))
                .pipe(takeWhile(() => this.isAlive))
                .subscribe((aclass: ClassModel) => {
                    if (aclass === null) {
                        return;
                    }

                    this.aclass = aclass;

                    this.getStudentsNames(aclass.attendance);
                    this.getEveryOtherStudentsNames(aclass.attendance);
                });
        });

        this.store
            .pipe(
                map(selectStudentLoaded),
                withLatestFrom(this.store.pipe(map(selectClassLoaded))),
                map(([studentLoaded, classLoaded]) => {
                    return studentLoaded && classLoaded;
                }),
                takeWhile(() => this.isAlive)
            )
            .subscribe(allValuesLoaded => {
                this.loaded = allValuesLoaded;
            });
    }

    getAttendanceList(): Observable<StudentModel[]> {
        return from([this.attendance]);
    }

    getNotAttendanceList(): Observable<StudentModel[]> {
        return from([this.notAttendance]);
    }

    getStudentsNames(studentIds: string[]) {
        this.store
            .pipe(
                select(selectStudentsWhoAttendedClass2, {
                    studentIds: studentIds,
                }),
                takeWhile(() => this.isAlive)
            )
            .subscribe(students => {
                this.attendance = students;
            });
    }

    getEveryOtherStudentsNames(studentIds: string[]): StudentModel[] {
        this.store
            .select(selectStudentsWhoDidntAttendedClass(studentIds))
            .pipe(takeWhile(() => this.isAlive))
            .subscribe(studentsArray => {
                this.notAttendance = studentsArray;
            });
        return;
    }

    removeStudentFromClass(event) {
        this.store.dispatch(
            new RemoveStudentFromClass({
                classId: this.classId,
                studentId: event.hbId,
            })
        );
    }

    addStudentToClass(event) {
        this.store.dispatch(
            new AddStudentToClass({
                classId: this.classId,
                studentId: event.hbId,
            })
        );
    }
}
