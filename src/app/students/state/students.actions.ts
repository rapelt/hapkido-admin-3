import {Action} from '@ngrx/store';
import { FamilyModel } from '../../common/models/family.model';
import { StudentModel } from '../../common/models/student';

export enum ActionTypes {
  Get_all_students = '[Students] Get All Students',
  Get_all_students_success = '[Students] Set All Students Success',
  Get_all_families = '[Students] Get All Families',
  Get_all_families_success = '[Students] Set All Families Success',
  Add_new_student = '[Students] Add new Student',
  Add_new_student_success = '[Students] Add new student Success',

  Set_selected_student = '[Students] Set selected student',
  Reset_selected_student = '[Students] Reset selected student',


}

export class GetAllStudents implements Action {
  readonly type = ActionTypes.Get_all_students;
}

export class GetAllFamilies implements Action {
  readonly type = ActionTypes.Get_all_families;
}

export class GetAllStudentsSuccess implements Action {
  readonly type = ActionTypes.Get_all_students_success;

  constructor(public payload: Array<StudentModel>) { }
}

export class GetAllFamiliesSuccess implements Action {
  readonly type = ActionTypes.Get_all_families_success;

  constructor(public payload: Array<FamilyModel>) { }
}

export class AddNewStudent implements Action {
  readonly type = ActionTypes.Add_new_student;

  constructor(public payload: StudentModel) { }
}

export class AddNewStudentSuccess implements Action {
  readonly type = ActionTypes.Add_new_student_success;

  constructor(public payload: StudentModel) { }
}

export class SetSelectedStudent implements Action {
  readonly type = ActionTypes.Set_selected_student;

  constructor(public payload: string) { }
}

export class ResetSelectedStudent implements Action {
  readonly type = ActionTypes.Reset_selected_student;
}

export type StudentsActions =
  GetAllStudents |
  GetAllStudentsSuccess |
  GetAllFamilies |
  GetAllFamiliesSuccess |
  AddNewStudent |
  AddNewStudentSuccess |
  SetSelectedStudent |
  ResetSelectedStudent;
