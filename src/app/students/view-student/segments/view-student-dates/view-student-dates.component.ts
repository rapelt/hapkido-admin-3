import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GradingDatesModel } from '../../../../common/models/grading-dates';
import { AppState } from '../../../../state/app.reducers';
import {
    selectSelectedStudentClassDates,
    selectSelectedStudentGradingDates,
} from '../../../state/students.selectors';

@Component({
    selector: 'app-view-student-dates',
    templateUrl: './view-student-dates.component.html',
    styleUrls: ['./view-student-dates.component.scss'],
})
export class ViewStudentDatesComponent implements OnInit {
    @Input()
    studentId: string;

    gradingDates: Observable<GradingDatesModel[]>;
    classDates: Observable<any>;

    constructor(public store: Store<AppState>) {}

    ngOnInit() {
        this.gradingDates = this.store.select(
            selectSelectedStudentGradingDates(this.studentId)
        );
        this.classDates = this.store.select(
            selectSelectedStudentClassDates(this.studentId)
        );
    }
}
