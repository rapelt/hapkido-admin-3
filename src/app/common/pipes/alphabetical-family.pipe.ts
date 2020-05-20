import { Pipe, PipeTransform } from '@angular/core';
import { FamilyModel } from '../models/family.model';

@Pipe({
    name: 'alphabeticalFamily',
})
export class AlphabeticalFamilyPipe implements PipeTransform {
    transform(array: FamilyModel[]): FamilyModel[] {
        if (array === null) {
            return array;
        }
        array.slice().sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });
        return array;
    }
}
