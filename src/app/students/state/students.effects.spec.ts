import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, throwError } from 'rxjs';

import { StudentsEffects } from './students.effects';
import { ActionTypes } from './students.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentsServices } from './students.services';
import { MessagesService } from '../../messages/messages.service';

describe('Student Effects', () => {
    let actions$: ReplaySubject<any>;
    let effects: StudentsEffects;
    let service: StudentsServices;
    let messages: MessagesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StudentsEffects,
                StudentsServices,
                MessagesService,
                provideMockActions(() => actions$),
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
            ],
        });

        effects = TestBed.inject(StudentsEffects);
        service = TestBed.inject(StudentsServices);
        messages = TestBed.inject(MessagesService);
    });

    it('should be created', async () => {
        expect(effects).toBeTruthy();
    });

    describe('Get All Students', () => {
        it('should get a list of students', done => {
            actions$ = new ReplaySubject<any>(1);
            spyOn(service, 'getAllStudents').and.returnValues(
                of([{ hbId: 'student' }])
            );

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Get_all_students,
            });

            effects.getAllStudents.subscribe(result => {
                expect(result.type).toEqual(
                    ActionTypes.Get_all_students_success
                );

                // @ts-ignore
                expect(result.payload).toEqual([{ hbId: 'student' }]);
                done();
            });
        });

        it('should throw an error if http fails and should show an error message', () => {
            actions$ = new ReplaySubject<any>(1);

            spyOn(service, 'getAllStudents').and.returnValues(
                throwError({ error: 'error', message: 'error' })
            );

            spyOn(messages.updateError, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Get_all_students,
            });

            effects.getAllStudents.subscribe();

            expect(messages.updateError.next).toHaveBeenCalledTimes(1);
            expect(messages.updateError.next).toHaveBeenCalledWith('error');
        });
    });

    describe('Get All Families', () => {
        it('should get a list of families', done => {
            actions$ = new ReplaySubject<any>(1);
            spyOn(service, 'getAllFamilies').and.returnValues(
                of([{ id: 'family' }])
            );

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Get_all_families,
            });

            effects.getAllFamilies.subscribe(result => {
                expect(result.type).toEqual(
                    ActionTypes.Get_all_families_success
                );

                // @ts-ignore
                expect(result.payload).toEqual([{ id: 'family' }]);
                done();
            });
        });
        it('should throw an error if http fails and should show an error message', () => {
            actions$ = new ReplaySubject<any>(1);

            spyOn(service, 'getAllFamilies').and.returnValues(
                throwError({ error: 'error', message: 'error' })
            );

            spyOn(messages.updateError, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Get_all_families,
            });

            effects.getAllFamilies.subscribe();

            expect(messages.updateError.next).toHaveBeenCalledTimes(1);
            expect(messages.updateError.next).toHaveBeenCalledWith('error');
        });
    });

    describe('Add a new student', () => {
        it('should successfully add a new student', done => {
            actions$ = new ReplaySubject<any>(1);
            spyOn(service, 'addNewStudent').and.returnValues(
                of([{ hbId: 'student' }])
            );

            spyOn(messages.updateSuccess, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Add_new_student,
            });

            effects.addNewStudent.subscribe(result => {
                expect(result.type).toEqual(
                    ActionTypes.Add_new_student_success
                );

                expect(messages.updateSuccess.next).toHaveBeenCalledTimes(1);
                expect(messages.updateSuccess.next).toHaveBeenCalledWith(
                    'New student created'
                );

                // @ts-ignore
                expect(result.payload).toEqual([{ hbId: 'student' }]);
                done();
            });
        });
        it('should throw an error if http fails and should show an error message', () => {
            actions$ = new ReplaySubject<any>(1);

            spyOn(service, 'addNewStudent').and.returnValues(
                throwError({ error: 'error', message: 'error' })
            );

            spyOn(messages.updateError, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Add_new_student,
            });

            effects.addNewStudent.subscribe();

            expect(messages.updateError.next).toHaveBeenCalledTimes(1);
            expect(messages.updateError.next).toHaveBeenCalledWith('error');
        });
    });

    describe('Edit a student', () => {
        it('should successfully edit a student', done => {
            actions$ = new ReplaySubject<any>(1);
            spyOn(service, 'editStudent').and.returnValues(
                of([{ hbId: 'student' }])
            );

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Edit_student,
            });

            effects.editStudent.subscribe(result => {
                expect(result.type).toEqual(ActionTypes.Edit_student_success);

                // @ts-ignore
                expect(result.payload).toEqual([{ hbId: 'student' }]);
                done();
            });
        });
        it('should throw an error if http fails and should show an error message', () => {
            actions$ = new ReplaySubject<any>(1);

            spyOn(service, 'editStudent').and.returnValues(
                throwError({ error: 'error', message: 'error' })
            );

            spyOn(messages.updateError, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Edit_student,
            });

            effects.editStudent.subscribe();

            expect(messages.updateError.next).toHaveBeenCalledTimes(1);
            expect(messages.updateError.next).toHaveBeenCalledWith('error');
        });
    });

    describe('Activate student', () => {
        it('should successfully activate a student', done => {
            actions$ = new ReplaySubject<any>(1);
            spyOn(service, 'activateStudent').and.returnValues(
                of({ studentId: 'student' })
            );

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Activate_student,
            });

            effects.activateStudent.subscribe(result => {
                expect(result.type).toEqual(
                    ActionTypes.Activate_student_success
                );

                // @ts-ignore
                expect(result.payload).toEqual('student');
                done();
            });
        });
        it('should throw an error if http fails and should show an error message', () => {
            actions$ = new ReplaySubject<any>(1);

            spyOn(service, 'activateStudent').and.returnValues(
                throwError({ error: 'error', message: 'error' })
            );

            spyOn(messages.updateError, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Activate_student,
            });

            effects.activateStudent.subscribe();

            expect(messages.updateError.next).toHaveBeenCalledTimes(1);
            expect(messages.updateError.next).toHaveBeenCalledWith('error');
        });
    });

    describe('Deactivate student', () => {
        it('should successfully deactivate a student', done => {
            actions$ = new ReplaySubject<any>(1);
            spyOn(service, 'deactivateStudent').and.returnValues(
                of({ studentId: 'student' })
            );

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Deactivate_student,
            });

            effects.deactivateStudent.subscribe(result => {
                expect(result.type).toEqual(
                    ActionTypes.Deactivate_student_success
                );

                // @ts-ignore
                expect(result.payload).toEqual('student');
                done();
            });
        });
        it('should throw an error if http fails and should show an error message', () => {
            actions$ = new ReplaySubject<any>(1);

            spyOn(service, 'deactivateStudent').and.returnValues(
                throwError({ error: 'error', message: 'error' })
            );

            spyOn(messages.updateError, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Deactivate_student,
            });

            effects.deactivateStudent.subscribe();

            expect(messages.updateError.next).toHaveBeenCalledTimes(1);
            expect(messages.updateError.next).toHaveBeenCalledWith('error');
        });
    });

    describe('Add a grading', () => {
        it('should successfully add a grading to a particular student profile', done => {
            actions$ = new ReplaySubject<any>(1);
            spyOn(service, 'addGrading').and.returnValues(
                of({ student: 'student' })
            );

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Add_grading,
                payload: {
                    student: {
                        hbId: 'hbId',
                    },
                },
            });

            effects.addGrading.subscribe(result => {
                expect(result.type).toEqual(ActionTypes.Add_grading_success);

                // @ts-ignore
                expect(result.payload).toEqual({ student: 'student' });
                done();
            });
        });
        it('should throw an error if http fails and should show an error message', () => {
            actions$ = new ReplaySubject<any>(1);

            spyOn(service, 'addGrading').and.returnValues(
                throwError({ error: 'error', message: 'error' })
            );

            spyOn(messages.updateError, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Add_grading,
                payload: {
                    student: {
                        hbId: 'hbId',
                    },
                },
            });

            effects.addGrading.subscribe();

            expect(messages.updateError.next).toHaveBeenCalledTimes(1);
            expect(messages.updateError.next).toHaveBeenCalledWith('error');
        });
    });

    describe('Remove a grading', () => {
        it('should successfully remove a grading to a particular student profile', done => {
            actions$ = new ReplaySubject<any>(1);
            spyOn(service, 'removeGrading').and.returnValues(
                of({ student: 'student' })
            );

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Remove_grading,
                payload: {
                    student: {
                        hbId: 'hbId',
                    },
                },
            });

            effects.removeGrading.subscribe(result => {
                expect(result.type).toEqual(ActionTypes.Remove_grading_success);

                // @ts-ignore
                expect(result.payload).toEqual({ student: 'student' });
                done();
            });
        });
        it('should throw an error if http fails and should show an error message', () => {
            actions$ = new ReplaySubject<any>(1);

            spyOn(service, 'removeGrading').and.returnValues(
                throwError({ error: 'error', message: 'error' })
            );

            spyOn(messages.updateError, 'next').and.callThrough();

            (actions$ as ReplaySubject<any>).next({
                type: ActionTypes.Remove_grading,
                payload: {
                    student: {
                        hbId: 'hbId',
                    },
                },
            });

            effects.removeGrading.subscribe();

            expect(messages.updateError.next).toHaveBeenCalledTimes(1);
            expect(messages.updateError.next).toHaveBeenCalledWith('error');
        });
    });
});
