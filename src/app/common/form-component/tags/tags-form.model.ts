import { ValidatorFn } from '@angular/forms';

export interface TagsFormModel {
    id: string;
    label: string;
    validators?: ValidatorFn | ValidatorFn[];
    validationMessages?: { type: string; message; string }[];
}
