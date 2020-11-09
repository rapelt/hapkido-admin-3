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
    selectStudentAndClassFeatureLoaded,
    selectStudentLoaded,
    selectStudents,
    selectStudentsWhoAttendedClass,
    selectStudentsWhoAttendedClass2,
    selectStudentsWhoDidntAttendedClass,
} from './students.selectors';

describe('Student Selectors', () => {
    it('selectActiveStudents should return a list of all the active students', () => {
        const state = {
            students: [{ isActive: true }, { isActive: false }],
        };

        expect(selectActiveStudents.projector(state)).toEqual([
            {
                isActive: true,
            },
        ]);
    });

    it('selectActiveStudents should return an empty array if no active students', () => {
        const state = {
            students: [{ isActive: false }, { isActive: false }],
        };

        expect(selectActiveStudents.projector(state)).toEqual([]);
    });

    it('selectInactiveStudents should return a list of all the inactive students', () => {
        const state = {
            students: [{ isActive: true }, { isActive: false }],
        };

        expect(selectInactiveStudents.projector(state)).toEqual([
            {
                isActive: false,
            },
        ]);
    });

    it('selectInactiveStudents should return an empty array if no inactive students', () => {
        const state = {
            students: [{ isActive: false }, { isActive: false }],
        };

        expect(selectActiveStudents.projector(state)).toEqual([]);
    });

    it('selectStudents should return an all student', () => {
        const state = {
            students: [{ student: 'student1' }, { student: 'student2' }],
        };

        expect(selectStudents.projector(state)).toEqual(state.students);
    });

    it('selectFamilies should return an all famlies', () => {
        const state = {
            families: [
                { family_id: 2, name: 'higgins' },
                { family_id: 2, name: 'higgins' },
            ],
        };

        expect(selectFamilies.projector(state)).toEqual(state.families);
    });

    it('selectSelectedStudent should return the student with the requested id', () => {
        const state = {
            students: [{ hbId: 'hb001' }, { hbId: 'hb002' }],
        };

        expect(selectSelectedStudent('hb001').projector(state)).toEqual({
            hbId: 'hb001',
        });
    });

    it('selectSelectedStudent should return the student with the same id', () => {
        const state = {
            students: [{ hbId: 'hb001' }, { hbId: 'hb002' }],
        };

        expect(selectSelectedStudent('hb001').projector(state)).toEqual({
            hbId: 'hb001',
        });
    });

    it('selectSelectedStudent should return null when null is passes as the id', () => {
        const state = {
            students: [{ hbId: 'hb001' }, { hbId: 'hb002' }],
        };

        expect(selectSelectedStudent(null).projector(state)).toEqual(null);
    });

    it('selectSelectedStudent should return null no students exist', () => {
        const state = {
            students: [],
        };

        expect(selectSelectedStudent('hb001').projector(state)).toEqual(null);
    });

    it('selectSelectedStudentGradingDates should return a list students grading dates', () => {
        const state = {
            students: {
                students: [
                    { hbId: 'hb001', gradingDates: [{ id: 1 }, { id: 2 }] },
                    { hbId: 'hb002', gradingDates: [{ id: 3 }, { id: 4 }] },
                ],
            },
        };

        expect(selectSelectedStudentGradingDates('hb001')(state)).toEqual([
            { id: 1 },
            { id: 2 },
        ]);
    });

    it('selectSelectedStudentClassDates should return a list of students class dates', () => {
        const state = {
            students: {
                students: [{ hbId: 'hb001' }, { hbId: 'hb002' }],
            },
            classes: {
                classes: [
                    { id: 1, attendance: ['hb001'] },
                    { id: 2, attendance: ['hb002', 'hb001'] },
                ],
            },
        };

        expect(selectSelectedStudentClassDates('hb002')(state)).toEqual([
            { id: 2, attendance: ['hb002', 'hb001'] },
        ]);
    });

    it('selectSelectedStudentClassDates should return an emplty list if no classes attended', () => {
        const state = {
            students: {
                students: [{ hbId: 'hb001' }, { hbId: 'hb002' }],
            },
            classes: {
                classes: [
                    { id: 1, attendance: ['hb001'] },
                    { id: 2, attendance: ['hb002', 'hb001'] },
                ],
            },
        };

        expect(selectSelectedStudentClassDates('hb003')(state)).toEqual([]);
    });

    it('selectStudentsWhoAttendedClass should return a list students who attended a class', () => {
        const state = {
            students: {
                students: [
                    { hbId: 'hb001' },
                    { hbId: 'hb002' },
                    { hbId: 'hb003' },
                ],
            },
        };

        expect(
            selectStudentsWhoAttendedClass(['hb001', 'hb003'])(state)
        ).toEqual([{ hbId: 'hb001' }, { hbId: 'hb003' }]);
    });

    it('selectStudentsWhoAttendedClass2 should return a list students who attended a class', () => {
        const state = {
            students: {
                students: [
                    { hbId: 'hb001' },
                    { hbId: 'hb002' },
                    { hbId: 'hb003' },
                ],
            },
        };

        expect(
            selectStudentsWhoAttendedClass2(state, {
                studentIds: ['hb001', 'hb003'],
            })
        ).toEqual([{ hbId: 'hb001' }, { hbId: 'hb003' }]);
    });

    it('selectStudentsWhoDidntAttendedClass should return a list students who didnt attended a class', () => {
        const state = {
            students: {
                students: [
                    { hbId: 'hb001', isActive: true },
                    { hbId: 'hb002', isActive: true },
                    { hbId: 'hb003', isActive: true },
                ],
            },
        };

        expect(
            selectStudentsWhoDidntAttendedClass(['hb001', 'hb003'])(state)
        ).toEqual([{ hbId: 'hb002', isActive: true }]);
    });

    it('selectSelectedStudentFamilyMembers should return a students family members', () => {
        const firstFamilyMember = {
            hbId: 'hb001',
            familyId: 3,
        };
        const secondFamilyMember = {
            hbId: 'hb003',
            familyId: 3,
        };

        const state = {
            students: {
                students: [
                    firstFamilyMember,
                    { hbId: 'hb002', familyId: 2 },
                    secondFamilyMember,
                    { hbId: 'hb004', familyId: 3 },
                ],
            },
        };

        expect(selectSelectedStudentFamilyMembers('hb004')(state)).toEqual([
            firstFamilyMember,
            secondFamilyMember,
        ]);
    });

    it('selectSelectedStudentFamilyMembers should return null is student is not found', () => {
        const state = {
            students: {
                students: [
                    {
                        hbId: 'hb001',
                        familyId: 3,
                    },
                    { hbId: 'hb002', familyId: 2 },
                ],
            },
        };

        expect(selectSelectedStudentFamilyMembers('hb004')(state)).toEqual(
            null
        );
    });

    it('selectSelectedStudentLastClass should return the latest class a student attended', () => {
        const attendedClass = {
            id: 3,
            attendance: ['hb002', 'hb003'],
            date: moment(new Date('2020/05/26')),
        };

        const state = {
            students: {
                students: [],
            },
            classes: {
                classes: [
                    {
                        id: 1,
                        attendance: ['hb001', 'hb003'],
                        date: moment(new Date('2020/05/24')),
                    },
                    {
                        id: 2,
                        attendance: ['hb002', 'hb001', 'hb003'],
                        date: moment(new Date('2020/05/23')),
                    },
                    {
                        id: 5,
                        attendance: ['hb001', 'hb002', 'hb003'],
                        date: moment(new Date('2020/05/24')),
                    },
                    attendedClass,
                    {
                        id: 4,
                        attendance: ['hb002', 'hb001', 'hb003'],
                        date: moment(new Date('2020/05/25')),
                    },
                ],
            },
        };

        expect(selectSelectedStudentsLastClass('hb003')(state)).toEqual(
            attendedClass
        );
    });

    it('selectSelectedStudentLastClass should return null if student id is undefined', () => {
        const state = {
            students: {
                students: [],
            },
            classes: {
                classes: [],
            },
        };

        expect(selectSelectedStudentsLastClass(null)(state)).toEqual(null);
    });

    it('selectSelectedStudentLastClass should return null if no classes found', () => {
        const state = {
            students: {
                students: [],
            },
            classes: {
                classes: [
                    {
                        id: 1,
                        attendance: ['hb001', 'hb003'],
                        date: moment(new Date('2020/05/24')),
                    },
                    {
                        id: 2,
                        attendance: ['hb002', 'hb001', 'hb003'],
                        date: moment(new Date('2020/05/23')),
                    },
                    {
                        id: 4,
                        attendance: ['hb002', 'hb001', 'hb003'],
                        date: moment(new Date('2020/05/25')),
                    },
                ],
            },
        };

        expect(selectSelectedStudentsLastClass('hb004')(state)).toEqual(null);
    });

    it('selectStudentAndClassFeatureLoaded should return true if all features are loaded', () => {
        const state = {
            students: {
                loaded: true,
                familiesLoaded: true,
            },
            classes: {
                loaded: true,
            },
        };

        expect(selectStudentAndClassFeatureLoaded(state)).toEqual(true);
    });

    it('selectStudentAndClassFeatureLoaded should return false if students are not loaded', () => {
        const state = {
            students: {
                loaded: false,
                familiesLoaded: true,
            },
            classes: {
                loaded: true,
            },
        };

        expect(selectStudentAndClassFeatureLoaded(state)).toEqual(false);
    });

    it('selectStudentAndClassFeatureLoaded should return false if classes are not loaded', () => {
        const state = {
            students: {
                loaded: true,
                familiesLoaded: false,
            },
            classes: {
                loaded: true,
            },
        };
        expect(selectStudentAndClassFeatureLoaded(state)).toEqual(false);
    });

    it('selectStudentAndClassFeatureLoaded should return false if families are not loaded', () => {
        const state = {
            students: {
                loaded: true,
                familiesLoaded: true,
            },
            classes: {
                loaded: false,
            },
        };
        expect(selectStudentAndClassFeatureLoaded(state)).toEqual(false);
    });

    it('selectStudentLoaded should return true if students are loaded', () => {
        const state = {
            students: {
                loaded: true,
            },
        };

        expect(selectStudentLoaded(state)).toEqual(true);
    });
});
