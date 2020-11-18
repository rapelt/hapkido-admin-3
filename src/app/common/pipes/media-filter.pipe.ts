import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mediaFilter',
})
export class MediaFilterPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (args[0] === '') {
            return value;
        }

        return value.filter(media => {
            return media.original_file_name
                .toLocaleLowerCase()
                .includes(args[0].toLocaleLowerCase());
        });
    }
}
