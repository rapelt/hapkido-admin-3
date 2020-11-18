import { Pipe, PipeTransform } from '@angular/core';
import { TechniqueModel } from '../models/technique';

@Pipe({
    name: 'sortTechniques',
})
export class SortTechniquesPipe implements PipeTransform {
    transform(array: TechniqueModel[]): TechniqueModel[] {
        if (array === null) {
            return array;
        }
        return array.slice().sort((a, b) => {
            if (this.hasNumber(a.title) && this.hasNumber(b.title)) {
                return (
                    Number(a.title.match(/(\d+)/g)[0]) -
                    Number(b.title.match(/(\d+)/g)[0])
                );
            }

            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }

    hasNumber(myString) {
        return /\d/.test(myString);
    }
}
