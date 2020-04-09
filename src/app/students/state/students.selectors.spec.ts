import { createClassWithAll } from '../../../testing-helpers/class-test-helper';
import { createFamilyWithAll } from '../../../testing-helpers/family-test-helper';
import { createStudentAll } from '../../../testing-helpers/student-test-helper';
import { ClassesState } from '../../classes/state/classes.reducers';
import { AppState } from '../../state/app.reducers';
import { StudentsState } from './students.reducers';
import * as moment from 'moment';
import {
    selectActiveStudents,
    selectFamilies,
    selectInactiveStudents,
    selectSelectedStudent,
    selectSelectedStudentClassDates,
    selectSelectedStudentFamilyMembers,
    selectSelectedStudentGradingDates,
    selectSelectedStudentsLastClass,
} from './students.selectors';

describe('Student Selectors', () => {
    const activeStudent = createStudentAll();
    const inactiveStudent = createStudentAll(
        null,
        null,
        'hb002',
        null,
        null,
        null,
        false
    );
    const family = createFamilyWithAll();

    // it('selectActiveStudents should return a list of all the active students', () => {
    //     const studentState: StudentsState = {
    //         students: [activeStudent, inactiveStudent],
    //         selectedStudent: null,
    //         families: [],
    //     };
    //
    //     const state: AppState = {
    //         students: studentState,
    //         classes: null,
    //         authentication: null,
    //     };
    //
    //     expect(selectActiveStudents(state)).toEqual([activeStudent]);
    // });

    // it('selectInactiveStudents should return a list of all the inactive students', () => {
    //
    //   const studentState: StudentsState = {
    //     students: [activeStudent, inactiveStudent],
    //     selectedStudent: null,
    //     families: []
    //   };
    //
    //   const state: AppState = {
    //     students: studentState,
    //     classes: null,
    //     authentication: null
    //   };
    //
    //   expect(selectInactiveStudents(state)).toEqual([inactiveStudent]);
    // });

    // it('selectFamilies should return a list of all the families', () => {
    //     const studentState: StudentsState = {
    //         students: [],
    //         selectedStudent: null,
    //         families: [family],
    //     };
    //
    //     const state: AppState = {
    //         students: studentState,
    //         classes: null,
    //         authentication: null,
    //     };
    //
    //     expect(selectFamilies(state)).toEqual([family]);
    // });

    it('selectSelectedStudent should return a student', () => {
        const studentState: StudentsState = {
            students: [activeStudent, inactiveStudent],
            selectedStudent: null,
            families: [],
            loaded: true,
        };

        const state: AppState = {
            students: studentState,
            classes: null,
            authentication: null,
            techniques: null,
            tags: null,
            media: null,
        };

        expect(selectSelectedStudent(activeStudent.hbId)(state)).toEqual(
            activeStudent
        );
    });

    // it('selectSelectedStudentGradingDates should return a students grading dates', () => {
    //     const studentState: StudentsState = {
    //         students: [activeStudent],
    //         selectedStudent: null,
    //         families: [],
    //     };
    //
    //     const state: AppState = {
    //         students: studentState,
    //         classes: null,
    //         authentication: null,
    //     };
    //
    //     expect(
    //         selectSelectedStudentGradingDates(activeStudent.hbId)(state)
    //     ).toEqual(activeStudent.gradingDates);
    // });

    it('selectSelectedStudentClassDates should return a list of class that the student attended', () => {
        const studentWhoAttendedClasses = createStudentAll(
            null,
            null,
            'hb003',
            null,
            null,
            null,
            false
        );

        const classWithStudent = createClassWithAll(null, null, ['hb003']);
        const classWithoutStudent = createClassWithAll(null, null, ['hb002']);
        const classWithStudent2 = createClassWithAll(null, null, [
            'hb002',
            'hb003',
        ]);

        const studentState: StudentsState = {
            students: [activeStudent],
            selectedStudent: null,
            families: [],
            loaded: true,
        };

        const classesState: ClassesState = {
            classes: [classWithoutStudent, classWithStudent, classWithStudent2],
            selectedClass: null,
            loaded: true,
        };

        const state: AppState = {
            students: studentState,
            classes: classesState,
            authentication: null,
            techniques: null,
            tags: null,
            media: null,
        };

        expect(
            selectSelectedStudentClassDates(studentWhoAttendedClasses.hbId)(
                state
            )
        ).toEqual([classWithStudent, classWithStudent2]);
    });

    it('selectSelectedStudentFamilyMembers should return a students family members', () => {
        const familyId = 3;
        const familyToSelect = createFamilyWithAll(familyId);

        const studentWithFamilyMember = createStudentAll(
            null,
            null,
            'hb001',
            null,
            null,
            null,
            false,
            null,
            null,
            familyId
        );

        const familyMember = createStudentAll(
            null,
            null,
            'hb002',
            null,
            null,
            null,
            false,
            null,
            null,
            familyId
        );

        const notAFamilyMember = createStudentAll(
            null,
            null,
            'hb003',
            null,
            null,
            null,
            false,
            null,
            null,
            4
        );

        const anotherFamilyMember = createStudentAll(
            null,
            null,
            'hb004',
            null,
            null,
            null,
            false,
            null,
            null,
            familyId
        );

        const studentState: StudentsState = {
            students: [
                studentWithFamilyMember,
                familyMember,
                notAFamilyMember,
                anotherFamilyMember,
            ],
            selectedStudent: null,
            families: [familyToSelect],
            loaded: true,
        };

        const state: AppState = {
            students: studentState,
            classes: null,
            authentication: null,
            techniques: null,
            tags: null,
            media: null,
        };

        expect(
            selectSelectedStudentFamilyMembers(studentWithFamilyMember.hbId)(
                state
            )
        ).toEqual([familyMember, anotherFamilyMember]);
    });

    it('selectSelectedStudentLastClass should return the latest class a student attended', () => {
        const studentWhoAttendedClasses = createStudentAll(
            null,
            null,
            'hb003',
            null,
            null,
            null,
            false
        );

        const classWithStudent = createClassWithAll(
            null,
            null,
            ['hb003'],
            null,
            moment('01/02/03')
        );
        const classWithStudent2 = createClassWithAll(
            null,
            null,
            ['hb003'],
            null,
            moment('29/01/03')
        );
        const classWithStudent3 = createClassWithAll(
            null,
            null,
            ['hb003'],
            null,
            moment('01/02/03')
        );

        const classWithoutStudent = createClassWithAll(
            null,
            null,
            ['hb002'],
            null,
            moment('02/02/03')
        );
        const lastClassWithStudent = createClassWithAll(
            null,
            null,
            ['hb002', 'hb003'],
            null,
            moment('03/02/03')
        );

        const studentState: StudentsState = {
            students: [activeStudent],
            selectedStudent: null,
            families: [],
            loaded: true,
        };

        const classesState: ClassesState = {
            classes: [
                classWithoutStudent,
                classWithStudent,
                lastClassWithStudent,
                classWithStudent2,
                classWithStudent3,
            ],
            selectedClass: null,
            loaded: true,
        };

        const state: AppState = {
            students: studentState,
            classes: classesState,
            authentication: null,
            techniques: null,
            tags: null,
            media: null,
        };

        expect(
            selectSelectedStudentsLastClass(studentWhoAttendedClasses.hbId)(
                state
            )
        ).toEqual(lastClassWithStudent);
    });
});
