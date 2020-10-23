import { ValidatorFn } from '@angular/forms';

export interface TagsFormModel {
    id: string;
    label: string;
    validators?: ValidatorFn | ValidatorFn[];
    validationMessages?: Array<{ type: string; message; string }>;
}
