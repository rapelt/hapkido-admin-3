import { ActionTypes, StudentsActions } from './students.actions';

export const STUDENTS_FEATURE_NAME = 'students';

export interface StudentsState {
  students: Array<any>;
  selectedStudent: any;
}

const initialState: StudentsState = {
  students: [],
  selectedStudent: null,
};

export function studentsReducer(state = initialState, action: StudentsActions) {
  switch (action.type) {
    default:
      return state;
  }
}


