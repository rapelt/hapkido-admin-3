import { ValidatorFn } from '@angular/forms';

export interface TextAreaModel {
    id: string;
    label: string;
    validators: ValidatorFn | ValidatorFn[];
    validationMessages: Array<{ type: string; message; string }>;
}
