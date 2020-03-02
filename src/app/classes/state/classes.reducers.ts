import * as _ from 'underscore';
import { ClassModel } from '../../common/models/class';
import { ActionTypes, ClassesActions } from './classes.actions';

export const CLASSES_FEATURE_NAME = 'classes';

export interface ClassesState {
    classes: any[];
    selectedClass: any;
}

const initialState: ClassesState = {
    classes: [],
    selectedClass: null,
};

export function classesReducer(state = initialState, action: ClassesActions) {
    switch (action.type) {
        case ActionTypes.Get_all_classes_success:
            return getAllClasses(state, action.payload);
        case ActionTypes.Add_classes_success:
            return addClass(state, action.payload);
        case ActionTypes.Delete_class_success:
            return deleteClass(state, action.payload);
        case ActionTypes.Make_a_class_a_grading_success:
            return makeClassAGrading(state, action.payload);
        case ActionTypes.Add_student_to_class_success:
            return addStudentToClass(state, action.payload);
        case ActionTypes.Remove_student_from_class_success:
            return removeStudentFromClass(state, action.payload);
        case ActionTypes.Set_selected_class:
            return setSelectedClass(state, action.payload);
        case ActionTypes.Reset_selected_class:
            return resetSelectedClass(state);
        default:
            return state;
    }
}

function getIndexOfClass(classes: ClassModel[], classId: number): number {
    return _.findIndex(classes, { classId: classId });
}

function getIndexOfStudentInClass(
    selectedClass: ClassModel,
    studentId: string
): number {
    return _.indexOf(selectedClass.attendance, studentId);
}

function removeStudentFromClass(state, payload): ClassesState {
    const index = getIndexOfClass(state.classes, parseInt(payload.classId, 10));
    const indexOfStudent = getIndexOfStudentInClass(
        state.classes[index],
        payload.studentId
    );
    const classes = [...state.classes];
    let updateClass;
    if (indexOfStudent >= 0) {
        updateClass = {
            ...state.classes[index],
        };
        updateClass.attendance.splice(indexOfStudent, 1);
        classes[index] = updateClass;
    }
    return {
        ...state,
        classes: classes,
        selectedClass: updateClass,
    };
}

function addStudentToClass(state, payload): ClassesState {
    const index = getIndexOfClass(state.classes, parseInt(payload.classId, 10));

    const updateClassWithStudent = {
        ...state.classes[index],
    };
    updateClassWithStudent.attendance.push(payload.studentId);
    const classes = [...state.classes];
    classes[index] = updateClassWithStudent;
    return {
        ...state,
        classes: classes,
        selectedClass: updateClassWithStudent,
    };
}

function setSelectedClass(state, payload): ClassesState {
    const classSelected = { ...payload };

    return {
        ...state,
        selectedClass: classSelected,
    };
}

function resetSelectedClass(state): ClassesState {
    return {
        ...state,
        selectedClass: null,
    };
}

function getAllClasses(state, payload): ClassesState {
    return {
        ...state,
        classes: payload,
    };
}

function addClass(state, payload): ClassesState {
    return {
        ...state,
        classes: [...state.classes, ...payload],
    };
}

function deleteClass(state, payload): ClassesState {
    const deletedClassIdex = getIndexOfClass(
        state.classes,
        parseInt(payload.classid, 10)
    );
    const classes1 = [...state.classes];
    classes1.splice(deletedClassIdex, 1);
    return {
        ...state,
        classes: classes1,
    };
}

function makeClassAGrading(state, payload): ClassesState {
    const indexGrading = getIndexOfClass(state.classes, parseInt(payload, 10));

    const updateClass = {
        ...state.classes[indexGrading],
    };
    updateClass.isGrading = true;
    const classes = [...state.classes];
    classes[indexGrading] = updateClass;
    return {
        ...state,
        classes: classes,
        selectedClass: updateClass,
    };
}
