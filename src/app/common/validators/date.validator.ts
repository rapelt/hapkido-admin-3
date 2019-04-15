import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function dateValidator(timeframe: 'future' | 'past'): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const date = control.value;

    const today = moment();

    if (timeframe === 'future' && moment(date).isBefore(today)) {
      return { dateInvalid: 'Date can not be in the past'};
    }

    if (timeframe === 'future') {
      moment(date).isBefore(today);
    }

    return null;
  };
}
