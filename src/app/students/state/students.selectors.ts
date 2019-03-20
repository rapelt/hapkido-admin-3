import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentsState } from './students.reducers';
import * as fromStudents from './students.reducers';

export const getStudentsState = createFeatureSelector<StudentsState>(
  fromStudents.STUDENTS_FEATURE_NAME
);
