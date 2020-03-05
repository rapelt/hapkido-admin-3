import { createStudentAll } from '../../testing-helpers/student-test-helper';
import { ClassTypes } from '../common/models/class-types';
import * as moment from 'moment';
import { StudentsHelper } from './students.helper';
import { fakeAsync } from '@angular/core/testing';

describe('Student Helper', () => {
    const student1 = createStudentAll(
        'firstname1',
        'lastname1',
        'hb001',
        'r@r.com',
        3,
        false,
        true,
        ClassTypes.Adults,
        [
            { grade: 0, date: moment(new Date('01/02/19').toISOString()) },
            { grade: 1, date: moment(new Date('02/02/19').toISOString()) },
            { grade: 2, date: moment(new Date('03/02/19').toISOString()) },
            { grade: 3, date: moment(new Date('04/02/19').toISOString()) },
        ]
    );

    const student2 = createStudentAll(
        'firstname2',
        'lastname2',
        'hb002',
        'r@r.com',
        8,
        false,
        true,
        ClassTypes.Adults,
        [
            { grade: 4, date: moment(new Date('01/01/19').toISOString()) },
            { grade: 5, date: moment(new Date('01/02/19').toISOString()) },
            { grade: 6, date: moment(new Date('01/02/19').toISOString()) },
            { grade: 7, date: moment(new Date('02/02/19').toISOString()) },
            { grade: 8, date: moment(new Date('03/02/19').toISOString()) },
        ]
    );

    const student3 = createStudentAll(
        'firstname3',
        'lastname3',
        'hb003',
        'r@r.com',
        12,
        false,
        true,
        ClassTypes.Adults,
        [
            { grade: 9, date: moment(new Date('01/02/18').toISOString()) },
            { grade: 10, date: moment(new Date('01/02/19').toISOString()) },
            { grade: 11, date: moment(new Date('02/02/20').toISOString()) },
        ]
    );
    const student4NoGradings = createStudentAll(
        'firstname4',
        'lastname4',
        'hb004',
        'r@r.com',
        0,
        false,
        true,
        ClassTypes.Adults,
        [{ grade: 0, date: moment(new Date('01/02/18').toISOString()) }]
    );

    const studentArray = [student1, student2, student3, student4NoGradings];
    beforeEach(() => {});

    it('should get list of students who graded on a particular date', fakeAsync(() => {
        const studentHelper = new StudentsHelper();

        const gradedStudents = studentHelper.getGradingInformationForStudents(
            [student1],
            moment(new Date('02/02/19').toISOString())
        );

        expect(gradedStudents.length).toEqual(1);

        expect(gradedStudents).toEqual([
            {
                beforeGrading: 0,
                afterGrading: 1,
                hbId: 'hb001',
                name: {
                    firstname: 'firstname1',
                    lastname: 'lastname1',
                },
            },
        ]);
    }));

    it('should not show white belts dates', fakeAsync(() => {
        const studentHelper = new StudentsHelper();

        const gradedStudents = studentHelper.getGradingInformationForStudents(
            [student1],
            moment(new Date('01/02/19').toISOString())
        );

        expect(gradedStudents.length).toEqual(0);

        expect(gradedStudents).toEqual([]);
    }));

    it('should calculate a double grading', fakeAsync(() => {
        const studentHelper = new StudentsHelper();

        const gradedStudents = studentHelper.getGradingInformationForStudents(
            [student2],
            moment(new Date('01/02/19').toISOString())
        );

        expect(gradedStudents.length).toEqual(1);

        expect(gradedStudents).toEqual([
            {
                beforeGrading: 4,
                afterGrading: 6,
                hbId: 'hb002',
                name: {
                    firstname: 'firstname2',
                    lastname: 'lastname2',
                },
            },
        ]);
    }));

    it('should not show anything for a student with no gradings', fakeAsync(() => {
        const studentHelper = new StudentsHelper();

        const gradedStudents = studentHelper.getGradingInformationForStudents(
            [student4NoGradings],
            moment(new Date('01/02/19').toISOString())
        );

        expect(gradedStudents.length).toEqual(0);

        expect(gradedStudents).toEqual([]);
    }));

    it('should not show anything for a student with no gradings', fakeAsync(() => {
        const studentHelper = new StudentsHelper();

        const gradedStudents = studentHelper.getGradingInformationForStudents(
            studentArray,
            moment(new Date('01/02/19').toISOString())
        );

        expect(gradedStudents.length).toEqual(2);

        expect(gradedStudents).toEqual([
            {
                afterGrading: 6,
                beforeGrading: 4,
                hbId: 'hb002',
                name: {
                    firstname: 'firstname2',
                    lastname: 'lastname2',
                },
            },
            {
                afterGrading: 10,
                beforeGrading: 9,
                hbId: 'hb003',
                name: {
                    firstname: 'firstname3',
                    lastname: 'lastname3',
                },
            },
        ]);
    }));
});
