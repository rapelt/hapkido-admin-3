import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emptyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const string = control.value;

        if (string === null) {
            return { empty: 'Empty String' };
        }

        if (string.toString().trim().length === 0) {
            return { empty: 'Empty String' };
        }

        return null;
    };
}
