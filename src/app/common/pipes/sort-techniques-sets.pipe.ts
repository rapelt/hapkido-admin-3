import { Pipe, PipeTransform } from '@angular/core';
import { TechniqueModel } from '../models/technique';
import { TechniqueSetModel } from '../models/technique-set';

@Pipe({
    name: 'sortTechniquesSets',
})
export class SortTechniquesSetsPipe implements PipeTransform {
    transform(array: TechniqueSetModel[]): TechniqueSetModel[] {
        if (array === null) {
            return array;
        }
        return array.slice().sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }
}
