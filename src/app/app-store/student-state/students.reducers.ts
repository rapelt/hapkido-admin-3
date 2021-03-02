import { FamilyModel } from '../../common/models/family.model';
import { ActionTypes, StudentsActions } from './students.actions';
import { ClassesState } from '../classes-state/classes.reducers';
import * as _ from 'underscore';
import { StudentModel } from '../../common/models/student';

export const STUDENTS_FEATURE_NAME = 'students';

export interface StudentsState {
    students: any[];
    selectedStudent: any;
    families: FamilyModel[];
    loaded: boolean;
    familiesLoaded: boolean;
}

const initialState: StudentsState = {
    students: [],
    selectedStudent: null,
    families: [],
    loaded: false,
    familiesLoaded: false,
};

export function studentsReducer(state = initialState, action: StudentsActions) {
    switch (action.type) {
        case ActionTypes.Remove_grading_success:
            return updateGradingState(state, action.payload);
        case ActionTypes.Add_grading_success:
            return updateGradingState(state, action.payload);
        case ActionTypes.Get_all_students_success:
            const newState = {
                ...state,
                students: action.payload,
                loaded: true,
            };
            return newState;
        case ActionTypes.Get_all_families_success:
            const familiesNewState = {
                ...state,
                families: action.payload,
                familiesLoaded: true,
            };
            return familiesNewState;
        case ActionTypes.Add_new_student_success:
            return {
                ...state,
                students: [...state.students, action.payload],
            };
        case ActionTypes.Edit_student_success:
            const editedStudent = {
                ...action.payload,
            };
            const editStudentIndex = state.students.findIndex(s => {
                return s.hbId.toLowerCase() ===
                    action.payload.hbId.toLowerCase()
                    ? true
                    : false;
            });

            const editStudentsList = [...state.students];
            editStudentsList[editStudentIndex] = editedStudent;

            return {
                ...state,
                students: editStudentsList,
                selectedStudent: editedStudent,
            };
        case ActionTypes.Set_selected_student:
            const student = state.students.find(s => {
                return s.hbId === action.payload ? true : false;
            });
            return {
                ...state,
                selectedStudent: student,
            };
        case ActionTypes.Reset_selected_student:
            return {
                ...state,
                selectedStudent: null,
            };
        case ActionTypes.Clear_loaded:
            return {
                ...state,
                loaded: false,
            };
        case ActionTypes.Activate_student_success:
            const activatesStudentId = action.payload;
            const activatedStudentIndex = state.students.findIndex(s => {
                return (
                    s.hbId.toLowerCase() === activatesStudentId.toLowerCase()
                );
            });

            const activatedStudentsList = [...state.students];
            activatedStudentsList[activatedStudentIndex] = {
                ...activatedStudentsList[activatedStudentIndex],
                isActive: true,
            };

            return {
                ...state,
                students: activatedStudentsList,
            };
        case ActionTypes.Edit_email_success:
            const emailStudentId = action.payload.hbId;
            const emailStudentIndex = state.students.findIndex(s => {
                return s.hbId.toLowerCase() === emailStudentId.toLowerCase();
            });

            const emailStudentsList = [...state.students];
            emailStudentsList[emailStudentIndex] = {
                ...emailStudentsList[emailStudentIndex],
                email: action.payload.email,
            };

            return {
                ...state,
                students: emailStudentsList,
            };

        case ActionTypes.Deactivate_student_success:
            const deactivatesStudentId: string = action.payload;
            const deactivatedStudentIndex = state.students.findIndex(s => {
                return (
                    s.hbId.toLowerCase() === deactivatesStudentId.toLowerCase()
                );
            });

            const deactivatedStudentsList = [...state.students];
            deactivatedStudentsList[deactivatedStudentIndex] = {
                ...deactivatedStudentsList[deactivatedStudentIndex],
                isActive: false,
            };

            return {
                ...state,
                students: deactivatedStudentsList,
            };
        case ActionTypes.Deactivate_student_in_app_success:
            return activation(action.payload, state, false, 'hasAppAccess');
        case ActionTypes.Activate_student_in_app_success:
            return activation(action.payload, state, true, 'hasAppAccess');
        case ActionTypes.Create_student_login_success:
            const loginState = activation(
                action.payload,
                state,
                true,
                'hasAppLogin'
            );
            return activation(action.payload, loginState, true, 'hasAppAccess');
        default:
            return state;
    }
}

function updateGradingState(state, payload): StudentsState {
    const updateStudent = {
        ...payload,
    };
    const students = [...state.students];
    const index = getIndexOfStudent(state.students, payload.hbId);
    students[index] = updateStudent;
    return {
        ...state,
        students: students,
    };
}

function getIndexOfStudent(students: StudentModel[], hbId: string): number {
    return _.findIndex(students, { hbId: hbId });
}

function activation(payload, state, activationState, property) {
    const id: string = payload;
    const studentIndex = state.students.findIndex(s => {
        return s.hbId.toLowerCase() === id.toLowerCase();
    });

    const studentsList = [...state.students];
    studentsList[studentIndex] = {
        ...studentsList[studentIndex],
        [property]: activationState,
    };

    return {
        ...state,
        students: studentsList,
    };
}
