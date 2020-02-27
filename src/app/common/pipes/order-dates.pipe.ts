import { Pipe, PipeTransform } from '@angular/core';
import { ClassModel } from '../models/class';

@Pipe({
    name: 'orderDates',
})
export class OrderDatesPipe implements PipeTransform {
    transform(array: ClassModel[], arg: string): ClassModel[] {
        if (array === null) {
            return array;
        }

        if (!arg || arg === 'ascending') {
            array.sort((a, b) => {
                if (a.date.isBefore(b.date)) {
                    return -1;
                }
                if (a.date.isAfter(b.date)) {
                    return 1;
                }
                return 0;
            });
            return array;
        }

        if (arg === 'descending') {
            array.sort((a, b) => {
                if (a.date.isBefore(b.date)) {
                    return 1;
                }
                if (a.date.isAfter(b.date)) {
                    return -1;
                }
                return 0;
            });
            return array;
        }
    }
}
