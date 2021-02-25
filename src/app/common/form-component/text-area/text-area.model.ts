import { ValidatorFn } from '@angular/forms';

export interface TextAreaModel {
    id: string;
    label: string;
    validators: ValidatorFn | ValidatorFn[];
    validationMessages: { type: string; message; string }[];
}
