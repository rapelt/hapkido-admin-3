import { FamilyModel } from '../../common/models/family.model';
import { ActionTypes, StudentsActions } from './students.actions';
import {StudentModel} from '../../common/models/student';

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
    case ActionTypes.Edit_student_success:

      const editedStudent = {
        ...action.payload
      };
      const editStudentIndex = state.students.findIndex((s) => {
        return s.hbId === action.payload.hbId ? true : false;
      });

      const editStudentsList = [...state.students];
      editStudentsList[editStudentIndex] = editedStudent;

      return {
        ...state,
        students: editStudentsList
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
    case ActionTypes.Activate_student_success:
      const activatesStudentId = action.payload;
      const activatedStudentIndex = state.students.findIndex((s) => {
        return s.hbId.toLowerCase() === activatesStudentId.toLowerCase();
      });

      const activatedStudentsList = [...state.students];
      activatedStudentsList[activatedStudentIndex] = {
        ...activatedStudentsList[activatedStudentIndex],
        isActive: true
      };

      return {
        ...state,
        students: activatedStudentsList
      };

    case ActionTypes.Deactivate_student_success:
      const deactivatesStudentId: string = action.payload;
      const deactivatedStudentIndex = state.students.findIndex((s) => {
        return s.hbId.toLowerCase() === deactivatesStudentId.toLowerCase();
      });

      const deactivatedStudentsList = [...state.students];
      deactivatedStudentsList[deactivatedStudentIndex] = {
        ...deactivatedStudentsList[deactivatedStudentIndex],
        isActive: false
      };

      return {
        ...state,
        students: deactivatedStudentsList
      };
    default:
      return state;
  }
}


