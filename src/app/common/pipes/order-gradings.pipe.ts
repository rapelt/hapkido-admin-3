import { Pipe, PipeTransform } from '@angular/core';
import { ClassModel } from '../models/class';
import { GradingDatesModel } from '../models/grading-dates';
import * as moment from 'moment';
import { StudentsHelper } from '../../students/students.helper';
@Pipe({
    name: 'orderGradings',
})
export class OrderGradingsPipe implements PipeTransform {
    constructor(public studentHelper: StudentsHelper) {}

    transform(array: GradingDatesModel[], arg: string): GradingDatesModel[] {
        if (array === null) {
            return array;
        }

        if (!arg || arg === 'ascending') {
            return this.studentHelper.orderGrades(array);
        }

        if (arg === 'descending') {
            return this.studentHelper.reverseOrderGrades(array);
        }
    }
}
