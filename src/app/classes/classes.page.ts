import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Moment } from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as moment from 'moment';
import { AppState } from '../app-store/state/app.reducers';
import { ClassesHelper } from './classes.helper';
import {
    GetAllClasses,
    ViewClass,
} from '../app-store/classes-state/classes.actions';
import {
    getClasses,
    getClassState,
    selectClassLoaded,
    selectSelectedClass,
} from '../app-store/classes-state/classes.selectors';
import { NavigationExtras, Router } from '@angular/router';
import {
    delay,
    map,
    mergeMap,
    takeWhile,
    withLatestFrom,
} from 'rxjs/operators';
import { selectStudentLoaded } from '../app-store/student-state/students.selectors';
import { PageComponent } from '../common/page.component';
import { GetAllStudents } from '../app-store/student-state/students.actions';

@Component({
    selector: 'app-classes',
    templateUrl: './classes.page.html',
    styleUrls: ['./classes.page.scss'],
})
export class ClassesPage extends PageComponent implements OnInit, OnDestroy {
    // Dates selected on init
    preselectedDates: Moment[] = [];

    // all classes ever
    allClasses: any = [];

    // Classes on selected days
    classesOnDay: any = [];

    // Selected day
    selectedValue: any;

    subscriber;

    loaded;

    constructor(
        public store: Store<AppState>,
        public classHelper: ClassesHelper,
        public router: Router
    ) {
        super();
    }

    ngOnInit() {
        this.store
            .select(getClassState)
            .pipe(takeWhile(() => this.isAlive))
            .subscribe(classState => {
                this.selectedValue =
                    classState.selectedClass && classState.selectedClass.date
                        ? classState.selectedClass.date
                        : new Date();

                this.preselectedDates = this.classHelper.getAllDates(
                    classState.classes
                );
                this.allClasses = classState.classes;
                this.resetClassesOnDay();
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

    onPeriodChange(event) {
        this.selectedValue = event.selectedValue;
        this.resetClassesOnDay();
    }

    resetClassesOnDay() {
        if (this.selectedValue != null) {
            this.classesOnDay = this.classHelper.getClassesOnDay(
                this.selectedValue,
                this.allClasses
            );
        }
    }

    classSelected(selectedClass) {
        this.store.dispatch(new ViewClass(selectedClass));
        this.router.navigateByUrl('class/view/' + selectedClass.classId);
        // this.navCtrl.push(this.viewClassPage);
    }

    addNewClass() {
        const navigationExtras: NavigationExtras = {
            queryParams: { date: this.selectedValue.toString() },
        };
        this.router.navigate(['/class/add'], navigationExtras);
    }
}
