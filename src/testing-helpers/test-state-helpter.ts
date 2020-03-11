import { createStudent, createStudentAll } from './student-test-helper';
import { createClassWithAll } from './class-test-helper';
import { AuthStatesEnum } from 'hapkido-auth-lib';

export function emptyInitialState() {
    return {
        authentication: {
            user: null,
            authenticationState: AuthStatesEnum.Loggedout,
            userAttributes: [],
            username: null,
            session: null,
        },
        students: {
            students: [],
            selectedStudent: null,
            families: [],
            loaded: false,
        },
        classes: {
            classes: [],
            selectedClass: null,
            loaded: false,
        },
    };
}

export function popululdatedInitialState() {
    const student = createStudentAll();

    return {
        authentication: {
            user: null,
            authenticationState: AuthStatesEnum.Loggedout,
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
        },
    };
}
