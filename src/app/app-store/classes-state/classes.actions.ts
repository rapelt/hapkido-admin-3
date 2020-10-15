import { Action } from '@ngrx/store';
import { ClassModel } from '../../common/models/class';

export enum ActionTypes {
    Get_all_classes = '[Classes] Get all classes',
    Get_all_classes_success = '[Classes] Set all classes success',
    Add_classes = '[Classes] Add classes',
    Set_selected_class = '[Classes] Set selected class',
    Reset_selected_class = '[Classes] Reset selected class',
    Add_student_to_class = '[Classes] Add student to class',
    Remove_student_from_class = '[Classes] Remove student from class',
    Delete_class = '[Classes] Delete class',
    Make_class_a_grading = '[Classes] Make class a grading',
    Add_classes_success = '[Classes] Add class success',
    Delete_class_success = '[Classes] Delete class success',
    Make_a_class_a_grading_success = '[Classes] Make a class a grading success',
    Add_student_to_class_success = '[Classes] Add student to class success',
    Remove_student_from_class_success = '[Classes] Remove student from class success',
    Clear_loaded = '[Classes] Clear loaded',
}

export class GetAllClasses implements Action {
    readonly type = ActionTypes.Get_all_classes;
}

export class ClearLoadedClasses implements Action {
    readonly type = ActionTypes.Clear_loaded;
}

export class GetAllClassesSuccess implements Action {
    readonly type = ActionTypes.Get_all_classes_success;

    constructor(public payload: ClassModel[]) {}
}

export class AddClasses implements Action {
    readonly type = ActionTypes.Add_classes;
    constructor(public payload: ClassModel[]) {}
}

export class DeleteClass implements Action {
    readonly type = ActionTypes.Delete_class;
    constructor(public payload: string) {}
}

export class ViewClass implements Action {
    readonly type = ActionTypes.Set_selected_class;
    constructor(public payload: ClassModel) {}
}

export class StopViewClass implements Action {
    readonly type = ActionTypes.Reset_selected_class;
}

export class AddStudentToClass implements Action {
    readonly type = ActionTypes.Add_student_to_class;
    constructor(public payload: { classId: string; studentId: string }) {}
}

export class RemoveStudentFromClass implements Action {
    readonly type = ActionTypes.Remove_student_from_class;
    constructor(public payload: { classId: string; studentId: string }) {}
}

export class MakeClassAGrading implements Action {
    readonly type = ActionTypes.Make_class_a_grading;
    constructor(public payload: string) {}
}

export class AddClassesSuccess implements Action {
    readonly type = ActionTypes.Add_classes_success;
    constructor(public payload: ClassModel[]) {}
}

export class DeleteClassSuccess implements Action {
    readonly type = ActionTypes.Delete_class_success;
    constructor(public payload: ClassModel) {}
}

export class AddStudentToClassSuccess implements Action {
    readonly type = ActionTypes.Add_student_to_class_success;
    constructor(public payload: { classId: string; studentId: string }) {}
}

export class RemoveStudentFromClassSuccess implements Action {
    readonly type = ActionTypes.Remove_student_from_class_success;
    constructor(public payload: { classId: string; studentId: string }) {}
}

export class MakeClassAGradingSuccess implements Action {
    readonly type = ActionTypes.Make_a_class_a_grading_success;
    constructor(public payload: ClassModel) {}
}

export type ClassesActions =
    | GetAllClasses
    | GetAllClassesSuccess
    | AddClasses
    | DeleteClass
    | ViewClass
    | StopViewClass
    | AddStudentToClass
    | RemoveStudentFromClass
    | MakeClassAGrading
    | AddClassesSuccess
    | DeleteClassSuccess
    | AddStudentToClassSuccess
    | RemoveStudentFromClassSuccess
    | ClearLoadedClasses
    | MakeClassAGradingSuccess;
