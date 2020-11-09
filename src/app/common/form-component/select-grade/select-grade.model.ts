import { ValidatorFn } from '@angular/forms';

export interface SelectGradeModel {
    id: string;
    label: string;
    validators: ValidatorFn | ValidatorFn[];
    validationMessages: Array<{ type: string; message; string }>;
}
