import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassesState } from './classes.reducers';
import * as fromClasses from './classes.reducers';

export const getClassState = createFeatureSelector<ClassesState>(
  fromClasses.CLASSES_FEATURE_NAME
);
