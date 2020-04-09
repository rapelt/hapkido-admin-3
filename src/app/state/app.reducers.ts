import { ActionReducerMap } from '@ngrx/store';
import * as authentication from '../authentication/state/authentication.reducers';
import * as student from '../students/state/students.reducers';
import * as classes from '../classes/state/classes.reducers';
import * as techniques from '../techniques/state/techniques.reducers';
import * as tags from '../tags/state/tags.reducers';
import * as media from '../media/state/media.reducers';

export const APP_NAME = 'app';

export interface AppState {
    authentication: authentication.AuthenticationState;
    students: student.StudentsState;
    classes: classes.ClassesState;
    techniques: techniques.TechniquesState;
    tags: tags.TagsState;
    media: media.MediaState;
}

export const reducers: ActionReducerMap<AppState> = {
    authentication: authentication.authenticationReducer,
    students: student.studentsReducer,
    classes: classes.classesReducer,
    techniques: techniques.techniquesReducer,
    tags: tags.tagsReducer,
    media: media.mediaReducer,
};
