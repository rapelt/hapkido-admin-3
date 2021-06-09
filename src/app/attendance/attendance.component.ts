import {
    ChangeDetectionStrategy,
    Component,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { ClassModel } from '../common/models/class';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../app-store/state/app.reducers';
import {
    ActionTypes,
    AddStudentToClass,
    AddStudentToClassSuccess,
    RemoveStudentFromClass,
    RemoveStudentFromClassSuccess,
} from '../app-store/classes-state/classes.actions';
import { Observable } from 'rxjs';
import { classTypes } from '../common/models/class-types';
import { PageComponent } from '../common/page.component';
import { delay, filter, map, take, takeWhile, tap } from 'rxjs/operators';
import {
    attendanceSelector,
    selectAttendanceloaded,
} from './attendance.selector';
import { AttendanceModel } from '../common/models/attendance.model';
import * as _ from 'underscore';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent extends PageComponent
    implements OnInit, OnDestroy {
    listType = 'active';
    searchvalue = '';

    classId: string;

    aclass: ClassModel;
    loaded: boolean;

    segment = 'studentsAttended';
    classTypes = classTypes;
    attendance: AttendanceModel[] = [];

    subsc;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {
        super();
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get('classId');
            this.store
                .pipe(
                    filter(() => this.loaded),
                    select(attendanceSelector(this.classId)),
                    takeWhile(() => this.attendance.length === 0)
                )
                .subscribe(newData => {
                    this.attendance = newData;
                });
        });

        this.subsc = this.actionsSubject.subscribe(
            (
                data: AddStudentToClassSuccess | RemoveStudentFromClassSuccess
            ) => {
                if (data.type === ActionTypes.Add_student_to_class_success) {
                    const index = _.findIndex(this.attendance, {
                        hbId: data.payload.studentId,
                    });

                    this.attendance[index].attended = true;
                }

                if (
                    data.type === ActionTypes.Remove_student_from_class_success
                ) {
                    const index = _.findIndex(this.attendance, {
                        hbId: data.payload.studentId,
                    });

                    this.attendance[index].attended = false;
                }
            }
        );

        this.store
            .pipe(
                takeWhile(() => this.isAlive),
                map(selectAttendanceloaded)
            )
            .subscribe(allValuesLoaded => {
                this.loaded = allValuesLoaded;
            });
    }

    removeStudentFromClass(event, index) {
        this.store.dispatch(
            new RemoveStudentFromClassSuccess({
                classId: this.classId,
                studentId: event.hbId,
            })
        );

        this.store.dispatch(
            new RemoveStudentFromClass({
                classId: this.classId,
                studentId: event.hbId,
            })
        );
    }

    addStudentToClass(event) {
        if (event == null) {
            return;
        }

        this.store.dispatch(
            new AddStudentToClassSuccess({
                classId: this.classId,
                studentId: event.hbId,
            })
        );

        this.store.dispatch(
            new AddStudentToClass({
                classId: this.classId,
                studentId: event.hbId,
            })
        );
    }

    searchInput(event) {
        this.searchvalue = event.detail.value;
    }

    cancelSearch() {
        this.searchvalue = '';
    }
}
