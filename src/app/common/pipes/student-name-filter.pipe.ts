import { Pipe, PipeTransform } from '@angular/core';
import { AttendanceModel } from '../models/attendance.model';
import { StudentModel } from '../models/student';

@Pipe({
    name: 'studentNameFilter',
    pure: true,
})
export class StudentNameFilterPipe implements PipeTransform {
    transform(value: AttendanceModel[], ...args: any[]): any {
        if (args[0] === '') {
            return value;
        }

        return value.filter(student => {
            return (
                student.name.firstname
                    .toLocaleLowerCase()
                    .includes(args[0].toLocaleLowerCase()) ||
                student.name.lastname
                    .toLocaleLowerCase()
                    .includes(args[0].toLocaleLowerCase())
            );
        });
    }
}
