import { createSelector } from '@ngrx/store';
import {
    getClasses,
    selectClassLoaded,
} from '../classes/state/classes.selectors';
import { ClassModel } from '../common/models/class';
import * as moment from 'moment';

export const todaysClassSelector = createSelector(
    getClasses,
    (classes: ClassModel[]) => {
        const today = moment(new Date());

        return classes.filter(aclass =>
            moment(today).isSame(aclass.date, 'day')
        );
    }
);

export const selectHomeloaded = createSelector(
    selectClassLoaded,
    classLoaded => {
        return classLoaded;
    }
);
