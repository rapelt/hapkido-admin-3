import { Pipe, PipeTransform } from '@angular/core';
import { AttendanceModel } from '../models/attendance.model';

@Pipe({
    name: 'attendanceFilterPipe',
    pure: true,
})
export class AttendanceFilterPipePipe implements PipeTransform {
    transform(value: AttendanceModel[], ...args: any[]): any {
        return value.filter(student => student.attended);
    }
}
