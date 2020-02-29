import { AuthenticationStates } from '../app/authentication/authentication-states';
import { createStudent, createStudentAll } from './student-test-helper';
import { createClassWithAll } from './class-test-helper';

export function emptyInitialState()  {
    return {
        authentication: {
            user: null,
            authenticationState: AuthenticationStates.LOGGEDOUT,
            userAttributes: [],
            username: null,
            session: null,
        },
        students: {
            students: [],
            selectedStudent: null,
            families: [],
        },
        classes: {
            classes: [],
            selectedClass: null,
        }
    };
}

export function popululdatedInitialState()  {
    const student = createStudentAll();

    return {
        authentication: {
            user: null,
            authenticationState: AuthenticationStates.LOGGEDOUT,
            userAttributes: [],
            username: null,
            session: null,
        },
        students: {
            students: [student],
            selectedStudent: student,
            families: [],
        },
        classes: {
            classes: [createClassWithAll()],
            selectedClass: null,
        }
    };
}
