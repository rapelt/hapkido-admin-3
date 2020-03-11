import { Pipe, PipeTransform } from '@angular/core';
import { StudentModel } from '../../models/student';
import { ClassTypes } from '../../models/class-types';

@Pipe({
    name: 'filterbypreferredclasstype',
})
export class FilterByPreferredClassTypePipe implements PipeTransform {
    transform(array: StudentModel[], args: any): StudentModel[] {
        if (array === null) {
            return array;
        }

        return array.filter(student => {
            if (student.preferredClass === args) {
                return true;
            }

            if (args === ClassTypes.Advanced) {
                return student.grade > 7;
            }

            if (args === ClassTypes.Kumdo) {
                return false;
                // TODO
            }
            return false;
        });
    }
}
