import { FamilyModel } from '../../common/models/family.model';
import { ActionTypes, StudentsActions } from './students.actions';

export const STUDENTS_FEATURE_NAME = 'students';

export interface StudentsState {
  students: Array<any>;
  selectedStudent: any;
  families: Array<FamilyModel>;
}

const initialState: StudentsState = {
  students: [],
  selectedStudent: null,
  families: []
};

export function studentsReducer(state = initialState, action: StudentsActions) {
  switch (action.type) {
    case ActionTypes.Get_all_students_success:
      const newState = {
        ...state,
        students: action.payload
      };
      return newState;
    case ActionTypes.Get_all_families_success:
      const familiesNewState = {
        ...state,
        families: action.payload
      };
      return familiesNewState;
    case ActionTypes.Add_new_student_success:
      return {
        ...state,
        students: [
          ...state.students,
          action.payload
        ]
      };
    case ActionTypes.Set_selected_student:

      const student = state.students.find((s) => {
        return s.hbId === action.payload ? true : false;
      });
      return {
        ...state,
        selectedStudent: student
      };
    case ActionTypes.Reset_selected_student:
      return {
        ...state,
        selectedStudent: null
      };
    default:
      return state;
  }
}


