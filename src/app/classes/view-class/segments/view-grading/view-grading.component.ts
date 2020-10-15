import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StudentsHelper } from '../../../../students/students.helper';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../app-store/state/app.reducers';
import { selectStudents } from '../../../../app-store/student-state/students.selectors';
import { selectSelectedClass } from '../../../../app-store/classes-state/classes.selectors';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-view-grading',
    templateUrl: './view-grading.component.html',
    styleUrls: ['./view-grading.component.scss'],
})
export class ViewGradingComponent implements OnInit, OnDestroy {
    @Input()
    aclassId: string;

    subsc;

    gradings: Array<{
        beforeGrading: number;
        afterGrading: number;
        hbId: string;
        name: {
            firstname: string;
            lastname: string;
        };
    }> = [];

    constructor(
        public studentHelper: StudentsHelper,
        public store: Store<AppState>
    ) {}

    ngOnInit() {
        this.subsc = combineLatest([
            this.store.select(selectStudents),
            this.store.select(selectSelectedClass(this.aclassId)),
        ])
            .pipe(
                map(([students, aclass]) => ({
                    students,
                    aclass,
                }))
            )
            .subscribe(({ students, aclass }) => {
                this.gradings = this.studentHelper.getGradingInformationForStudents(
                    students,
                    aclass.date
                );
            });
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
