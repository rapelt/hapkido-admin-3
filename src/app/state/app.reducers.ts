import { ActionReducerMap } from '@ngrx/store';
import * as authentication from '../authentication/state/authentication.reducers';
import * as student from '../students/state/students.reducers';


export interface AppState {
  authentication: authentication.AuthenticationState;
  students: student.StudentsState;
}

export const reducers: ActionReducerMap<AppState> = {
  authentication: authentication.authenticationReducer,
  students: student.studentsReducer
};
