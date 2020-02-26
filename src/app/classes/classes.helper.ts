import { Injectable } from '@angular/core';
import { Moment } from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as moment from 'moment';
import { ClassModel } from '../common/models/class';

@Injectable({
    providedIn: 'root',
})
export class ClassesHelper {
    constructor() {}

    getAllDates(classes: ClassModel[]): Moment[] {
        const dates: Moment[] = [];
        classes.forEach(aclass => {
            dates.push(aclass.date);
        });
        return dates;
    }

    getClassesOnDay(selectedValue: Date, classes: ClassModel[]) {
        const day = moment(selectedValue);
        const classesOnADay: ClassModel[] = [];

        classes.forEach(aclass => {
            if (moment(day).isSame(aclass.date, 'day')) {
                classesOnADay.push(aclass);
            }
        });
        return classesOnADay;
    }
}
