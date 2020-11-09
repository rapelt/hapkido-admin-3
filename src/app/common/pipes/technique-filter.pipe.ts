import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'techniqueFilter',
})
export class TechniqueFilterPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (args[0] === '') {
            return value;
        }

        return value.filter(technique => {
            return technique.title
                .toLocaleLowerCase()
                .includes(args[0].toLocaleLowerCase());
        });
    }
}
