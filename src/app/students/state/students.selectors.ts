import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentModel } from '../models/student';
import { StudentsState } from './students.reducers';
import * as fromStudents from './students.reducers';

export const getStudentsState = createFeatureSelector<StudentsState>(
  fromStudents.STUDENTS_FEATURE_NAME
);

export const selectActiveStudents = createSelector(
  getStudentsState,
  studentsState => {
    return studentsState.students.filter((student: StudentModel) => {
      return student.isActive;
    });
  }
);

export const selectInactiveStudents = createSelector(
  getStudentsState,
  studentsState => {
    return studentsState.students.filter((student: StudentModel) => {
      return !student.isActive;
    });
  }
);
