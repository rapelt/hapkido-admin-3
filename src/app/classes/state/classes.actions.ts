import {Action} from '@ngrx/store';
import { ClassModel } from '../../common/models/class';

export enum ActionTypes {
  Get_all_classes = '[Classes] Get All Classes',
  Get_all_classes_success = '[Classes] Set All Classes Success'
}

export class GetAllClasses implements Action {
  readonly type = ActionTypes.Get_all_classes;
}

export class GetAllClassesSuccess implements Action {
  readonly type = ActionTypes.Get_all_classes_success;

  constructor(public payload: Array<ClassModel>) { }
}



export type ClassesActions =
  GetAllClasses |
  GetAllClassesSuccess;
