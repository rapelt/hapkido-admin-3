import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app.reducers';
import { selectSelectedStudentsLastClass } from '../../../students/state/students.selectors';
import { ClassModel } from '../../models/class';
import * as moment from 'moment-timezone';
import { StudentModel } from '../../models/student';

@Component({
    selector: 'app-missed-class-warning',
    templateUrl: './missed-class-warning.component.html',
    styleUrls: ['./missed-class-warning.component.scss'],
})
export class MissedClassWarningComponent implements OnInit, OnDestroy {
    shouldShowWarning;

    timeSinceLastClass;

    @Input()
    student: StudentModel;

    @Input()
    showDays = false;

    studentSubscriber;

    constructor(public store: Store<AppState>) {}

    ngOnInit() {
        const studentLastClass = this.store.select(
            selectSelectedStudentsLastClass(this.student.hbId)
        );
        this.studentSubscriber = studentLastClass.subscribe(aclass => {
            if (aclass) {
                const lastClassDate = aclass.date;
                const today = moment();
                this.timeSinceLastClass = Math.round(
                    moment.duration(today.diff(lastClassDate)).as('days')
                );

                this.shouldShowWarning = this.timeSinceLastClass > 60;
            }
        });
    }

    ngOnDestroy(): void {
        this.studentSubscriber.unsubscribe();
    }
}
