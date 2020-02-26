import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as moment from 'moment';
import { AppState } from '../state/app.reducers';
import { ClassesHelper } from './classes.helper';
import { ViewClass } from './state/classes.actions';
import { getClasses, getClassState } from './state/classes.selectors';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-classes',
    templateUrl: './classes.page.html',
    styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
    // Dates selected on init
    preselectedDates: Moment[] = [];

    // all classes ever
    allClasses: any = [];

    // Classes on selected days
    classesOnDay: any = [];

    // Selected day
    selectedValue: any;

    constructor(
        public store: Store<AppState>,
        public classHelper: ClassesHelper,
        public router: Router
    ) {}

    ngOnInit() {
        this.store.select(getClasses).subscribe(classes => {
            this.preselectedDates = this.classHelper.getAllDates(classes);
            this.allClasses = classes;
            this.selectedValue = new Date();
            this.resetClassesOnDay();
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
