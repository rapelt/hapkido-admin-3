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
import { select, Store } from '@ngrx/store';
import { AppState } from '../app-store/state/app.reducers';
import {
    AddStudentToClass,
    AddStudentToClassSuccess,
    RemoveStudentFromClass,
    RemoveStudentFromClassSuccess,
} from '../app-store/classes-state/classes.actions';
import { Observable } from 'rxjs';
import { classTypes } from '../common/models/class-types';
import { PageComponent } from '../common/page.component';
import { filter, map, takeWhile } from 'rxjs/operators';
import {
    attendanceSelector,
    selectAttendanceloaded,
} from './attendance.selector';
import { AttendanceModel } from '../common/models/attendance.model';

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
    attendance: Observable<AttendanceModel[]>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public store: Store<AppState>
    ) {
        super();
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get('classId');
            this.attendance = this.store.pipe(
                filter(() => this.loaded),
                select(attendanceSelector(this.classId)),
                takeWhile(() => this.isAlive)
            );
        });

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
            new RemoveStudentFromClass({
                classId: this.classId,
                studentId: event.hbId,
            })
        );

        this.store.dispatch(
            new RemoveStudentFromClassSuccess({
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
            new AddStudentToClass({
                classId: this.classId,
                studentId: event.hbId,
            })
        );

        this.store.dispatch(
            new AddStudentToClassSuccess({
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
