import { createStudent } from '../../../testing-helpers/student-test-helper';
import { SetUserAttributes } from '../auth-state/authentication.actions';
import { GetAllStudents, GetAllStudentsSuccess } from './students.actions';
import { StudentsState } from './students.reducers';
import * as reducer from './students.reducers';

describe('Student Reducer', () => {
    it('should set all students', () => {
        const students: StudentsState = {
            students: [],
            selectedStudent: null,
            families: [],
            loaded: false,
            familiesLoaded: false,
        };

        const expectedStudents = {
            students: [createStudent(), createStudent()],
            selectedStudent: null,
            families: [],
            loaded: true,
            familiesLoaded: false,
        };

        expect(
            reducer.studentsReducer(
                students,
                new GetAllStudentsSuccess(expectedStudents.students)
            )
        ).toEqual(expectedStudents);
    });

    it('should return default', () => {
        const students: StudentsState = {
            students: [],
            selectedStudent: null,
            families: [],
            loaded: false,
            familiesLoaded: false,
        };

        const expectedStudents = {
            students: [createStudent(), createStudent()],
            selectedStudent: null,
            families: [],
            loaded: true,
            familiesLoaded: false,
        };

        expect(reducer.studentsReducer(students, new GetAllStudents())).toEqual(
            students
        );
    });
});
