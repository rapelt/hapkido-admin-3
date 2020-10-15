import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'techniqueSetFilter',
})
export class TechniqueSetFilterPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (args[0] === '') {
            return value;
        }

        return value.filter(techniqueSet => {
            return techniqueSet.name
                .toLocaleLowerCase()
                .includes(args[0].toLocaleLowerCase());
        });
    }
}
