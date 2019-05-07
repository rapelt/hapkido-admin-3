import { ActionReducerMap } from '@ngrx/store';
import * as authentication from '../authentication/state/authentication.reducers';
import * as student from '../students/state/students.reducers';
import * as classes from '../classes/state/classes.reducers';



export interface AppState {
  authentication: authentication.AuthenticationState;
  students: student.StudentsState;
  classes: classes.ClassesState;

}

export const reducers: ActionReducerMap<AppState> = {
  authentication: authentication.authenticationReducer,
  students: student.studentsReducer,
  classes: classes.classesReducer
};
