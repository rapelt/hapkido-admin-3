import { Pipe, PipeTransform } from '@angular/core';
import { StudentModel } from '../../models/student';

@Pipe({
    name: 'alphabeticalstudents',
})
export class AlphabeticalStudentsPipe implements PipeTransform {
    transform(array: StudentModel[]): StudentModel[] {
        if (array === null) {
            return array;
        }
        array.sort((a, b) => {
            if (
                a.name.firstname.toLowerCase() < b.name.firstname.toLowerCase()
            ) {
                return -1;
            }
            if (
                a.name.firstname.toLowerCase() > b.name.firstname.toLowerCase()
            ) {
                return 1;
            }
            return 0;
        });
        return array;
    }
}
