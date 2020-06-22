import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitialise',
    pure: true,
})
export class CapitialisePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (!value) {
            return value;
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
