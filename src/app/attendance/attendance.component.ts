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
import { selectSelectedClass } from '../classes/state/classes.selectors';
import {
    selectStudentsWhoAttendedClass,
    selectStudentsWhoAttendedClass2,
    selectStudentsWhoDidntAttendedClass,
} from '../students/state/students.selectors';
import { from, Observable, of } from 'rxjs';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit, OnDestroy {
    classId: string;
    subsc;
    subsc1;
    subsc2;

    aclass: ClassModel;

    segment = 'studentsAttended';

    attendance: StudentModel[] = [];
    notAttendance: StudentModel[] = [];

    attendance2: StudentModel[] = [];

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
                        if (aclass === null) {
                            return;
                        }

                        this.aclass = aclass;

                        this.getStudentsNames(aclass.attendance);
                        this.getEveryOtherStudentsNames(aclass.attendance);
                    });
            }
        );
    }

    getAttendanceList(): Observable<StudentModel[]> {
        return from([this.attendance2]);
    }

    getNotAttendanceList(): Observable<StudentModel[]> {
        return from([this.notAttendance]);
    }

    getStudentsNames(studentIds: string[]) {
        // this.store
        //     .select(selectStudentsWhoAttendedClass(studentIds))
        //     .subscribe(studentsArray => {
        //         this.attendance = studentsArray;
        //     });
        // return;

        this.subsc2 = this.store
            .pipe(
                select(selectStudentsWhoAttendedClass2, {
                    studentIds: studentIds,
                })
            )
            .subscribe(students => {
                this.attendance2 = students;
            });
    }

    getEveryOtherStudentsNames(studentIds: string[]): StudentModel[] {
        this.store
            .select(selectStudentsWhoDidntAttendedClass(studentIds))
            .subscribe(studentsArray => {
                this.notAttendance = studentsArray;
            });
        return;
    }

    removeStudentFromClass(event) {
        this.store.dispatch(
            new RemoveStudentFromClass({
                classId: this.classId,
                studentId: event,
            })
        );
    }

    addStudentToClass(event) {
        this.store.dispatch(
            new AddStudentToClass({
                classId: this.classId,
                studentId: event,
            })
        );
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
        this.subsc1.unsubscribe();
        this.subsc2.unsubscribe();
    }
}
