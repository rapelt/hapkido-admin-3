import { Action } from '@ngrx/store';
import { FamilyModel } from '../../common/models/family.model';
import { StudentModel } from '../../common/models/student';
import { GradingDatesModel } from '../../common/models/grading-dates';

export enum ActionTypes {
    Get_all_students = '[Students] Get All Students',
    Get_all_students_success = '[Students] Set All Students Success',

    Get_all_families = '[Students] Get All Families',
    Get_all_families_success = '[Students] Set All Families Success',

    Add_new_student = '[Students] Add new Student',
    Add_new_student_success = '[Students] Add new student Success',

    Edit_student = '[Students] Edit Student',
    Edit_student_success = '[Students] Edit Student Success',

    Set_selected_student = '[Students] Set selected student',
    Reset_selected_student = '[Students] Reset selected student',

    Activate_student = '[Students] Activate Student',
    Activate_student_success = '[Students] Activate Student Success',

    Deactivate_student = '[Students] Deactivate Student',
    Deactivate_student_success = '[Students] Deactivate Student Success',

    Add_grading = '[Students] Add Grading',
    Add_grading_success = '[Students] Add Grading Success',

    Remove_grading = '[Students] Remove Grading',
    Remove_grading_success = '[Students] Remove Grading Success',

    Clear_loaded = '[Students] Clear loaded',
}

export class GetAllStudents implements Action {
    readonly type = ActionTypes.Get_all_students;
}

export class ClearLoadedStudents implements Action {
    readonly type = ActionTypes.Clear_loaded;
}

export class GetAllFamilies implements Action {
    readonly type = ActionTypes.Get_all_families;
}

export class GetAllStudentsSuccess implements Action {
    readonly type = ActionTypes.Get_all_students_success;

    constructor(public payload: StudentModel[]) {}
}

export class GetAllFamiliesSuccess implements Action {
    readonly type = ActionTypes.Get_all_families_success;

    constructor(public payload: FamilyModel[]) {}
}

export class AddNewStudent implements Action {
    readonly type = ActionTypes.Add_new_student;

    constructor(public payload: StudentModel) {}
}

export class AddNewStudentSuccess implements Action {
    readonly type = ActionTypes.Add_new_student_success;

    constructor(public payload: StudentModel) {}
}

export class EditStudent implements Action {
    readonly type = ActionTypes.Edit_student;

    constructor(public payload: StudentModel) {}
}

export class EditStudentSuccess implements Action {
    readonly type = ActionTypes.Edit_student_success;

    constructor(public payload: StudentModel) {}
}

export class SetSelectedStudent implements Action {
    readonly type = ActionTypes.Set_selected_student;

    constructor(public payload: string) {}
}

export class ResetSelectedStudent implements Action {
    readonly type = ActionTypes.Reset_selected_student;
}

export class ActivateStudent implements Action {
    readonly type = ActionTypes.Activate_student;

    constructor(public payload: string) {}
}

export class ActivateStudentSuccess implements Action {
    readonly type = ActionTypes.Activate_student_success;

    constructor(public payload: string) {}
}

export class DeactivateStudent implements Action {
    readonly type = ActionTypes.Deactivate_student;

    constructor(public payload: string) {}
}

export class DeactivateStudentSuccess implements Action {
    readonly type = ActionTypes.Deactivate_student_success;

    constructor(public payload: string) {}
}

export class AddGrading implements Action {
    readonly type = ActionTypes.Add_grading;
    constructor(
        public payload: { student: StudentModel; grading: GradingDatesModel[] }
    ) {}
}

export class RemoveGrading implements Action {
    readonly type = ActionTypes.Remove_grading;
    constructor(
        public payload: { student: StudentModel; grading: GradingDatesModel[] }
    ) {}
}

export class AddGradingSuccess implements Action {
    readonly type = ActionTypes.Add_grading_success;
    constructor(public payload: StudentModel) {}
}

export class RemoveGradingSuccess implements Action {
    readonly type = ActionTypes.Remove_grading_success;
    constructor(public payload: StudentModel) {}
}

export type StudentsActions =
    | GetAllStudents
    | GetAllStudentsSuccess
    | GetAllFamilies
    | GetAllFamiliesSuccess
    | AddNewStudent
    | AddNewStudentSuccess
    | SetSelectedStudent
    | EditStudent
    | EditStudentSuccess
    | DeactivateStudent
    | DeactivateStudentSuccess
    | ActivateStudent
    | ActivateStudentSuccess
    | ResetSelectedStudent
    | AddGrading
    | AddGradingSuccess
    | RemoveGrading
    | ClearLoadedStudents
    | RemoveGradingSuccess;
