import { Pipe, PipeTransform } from '@angular/core';
import { AttendanceModel } from '../models/attendance.model';

@Pipe({
    name: 'activeStudents',
    pure: true,
})
export class ActiveStudentPipe implements PipeTransform {
    transform(value: AttendanceModel[], ...args: any[]): any {
        return value.filter(student => student.isActive);
    }
}
