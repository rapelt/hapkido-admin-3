import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'prioritiseselectedclass',
})
export class PrioritiseSelectedClassPipe implements PipeTransform {
    transform(array: string[], args: any): string[] {
        if (array === null) {
            return array;
        }

        array = _.reject(array, ctype => {
            return ctype === args;
        });

        array.unshift(args);

        return array;
    }
}
