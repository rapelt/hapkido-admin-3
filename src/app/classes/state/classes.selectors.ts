import { createFeatureSelector, createSelector, Selector, MemoizedSelector } from '@ngrx/store';
import { ClassModel } from '../../common/models/class';
import * as fromClasses from './classes.reducers';
// tslint:disable-next-line:no-duplicate-imports
import { ClassesState } from './classes.reducers';
import { Observable } from 'rxjs';

export const getClassState = createFeatureSelector<ClassesState>(
    fromClasses.CLASSES_FEATURE_NAME
);

export const getClasses = createSelector(getClassState, classesState => {
    return classesState.classes;
});

export const selectSelectedClass = (id: string) =>
    createSelector(getClassState, classesState => {
        if (classesState.classes.length === 0) {
            return null;
        }

        return classesState.classes.find((c: ClassModel) => {
            return c.classId.toString() === id;
        });
    });
