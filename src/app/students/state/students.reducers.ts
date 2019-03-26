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
    case ActionTypes.Get_all_students_success:
      const newState = {
        ...state,
        students: action.payload
      };
      return newState;
    default:
      return state;
  }
}


