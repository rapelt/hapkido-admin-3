import { ValidatorFn } from '@angular/forms';

export interface InputModel {
    id: string;
    label: string;
    validators: ValidatorFn | ValidatorFn[];
    validationMessages: { type: string; message; string }[];
    options?: [{ name: string; value: string | number }];
}
