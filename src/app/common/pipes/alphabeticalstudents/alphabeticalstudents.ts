import { Pipe, PipeTransform } from '@angular/core';
import { StudentModel } from '../../models/student';
import { AttendanceModule } from '../../../attendance/attendance.module';
import { AttendanceModel } from '../../models/attendance.model';

type HasNameType = AttendanceModel[] | StudentModel[];

@Pipe({
    name: 'alphabeticalstudents',
    pure: true,
})
export class AlphabeticalStudentsPipe implements PipeTransform {
    transform(array: HasNameType): HasNameType {
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
