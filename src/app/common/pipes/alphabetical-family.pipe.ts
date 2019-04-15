import { Pipe, PipeTransform } from '@angular/core';
import { FamilyModel } from '../models/family.model';

@Pipe({
  name: 'alphabeticalFamily',
})
export class AlphabeticalFamilyPipe implements PipeTransform {
  transform(array: Array<FamilyModel>): Array<FamilyModel> {
    if (array === null) { return array; }
    array.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    return array;
  }
}
