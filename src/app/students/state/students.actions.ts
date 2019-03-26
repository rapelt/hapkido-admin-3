import {Action} from '@ngrx/store';
import { StudentModel } from '../models/student';

export enum ActionTypes {
  Get_all_students = '[Students] Get All Students',
  Get_all_students_success = '[Students] Set All Students Success',

}

export class GetAllStudents implements Action {
  readonly type = ActionTypes.Get_all_students;
}

export class GetAllStudentsSuccess implements Action {
  readonly type = ActionTypes.Get_all_students_success;

  constructor(public payload: Array<StudentModel>) { }
}

export type StudentsActions =
  GetAllStudents |
  GetAllStudentsSuccess;
