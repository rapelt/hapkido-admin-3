import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../common/messages/messages.service';
import { FamilyModel } from '../../common/models/family.model';
import { StudentModel } from '../../common/models/student';
import {
    ActionTypes,
    ActivateStudent,
    ActivateStudentInApp,
    AddGrading,
    AddNewStudent,
    CreateStudentLogin,
    DeactivateStudent,
    DeactivateStudentInApp,
    EditEmail,
    EditStudent,
    RemoveGrading,
} from './students.actions';
import { StudentsServices } from './students.services';

@Injectable()
export class StudentsEffects {
    @Effect()
    getAllStudents = this.actions.pipe(
        ofType(ActionTypes.Get_all_students),
        mergeMap(() =>
            this.studentService.getAllStudents().pipe(
                map((students: StudentModel[]) => ({
                    type: ActionTypes.Get_all_students_success,
                    payload: students,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    getAllFamilies = this.actions.pipe(
        ofType(ActionTypes.Get_all_families),
        mergeMap(() =>
            this.studentService.getAllFamilies().pipe(
                map((families: FamilyModel[]) => ({
                    type: ActionTypes.Get_all_families_success,
                    payload: families,
                })),
                catchError(error => {
                    this.handleError(error.message); // Not available in prod yet
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    addNewStudent = this.actions.pipe(
        ofType(ActionTypes.Add_new_student),
        mergeMap((action: AddNewStudent) =>
            this.studentService.addNewStudent(action.payload).pipe(
                map((student: StudentModel[]) => ({
                    type: ActionTypes.Add_new_student_success,
                    payload: student,
                })),
                tap(() => {
                    this.messageService.updateSuccess.next(
                        'New student created'
                    );
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editStudent = this.actions.pipe(
        ofType(ActionTypes.Edit_student),
        mergeMap((action: EditStudent) =>
            this.studentService.editStudent(action.payload).pipe(
                map((student: StudentModel[]) => ({
                    type: ActionTypes.Edit_student_success,
                    payload: student,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next();
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editEmail = this.actions.pipe(
        ofType(ActionTypes.Edit_email),
        mergeMap((action: EditEmail) =>
            this.studentService
                .editEmail(action.payload.email, action.payload.hbId)
                .pipe(
                    map((update: { email: string; studentId: string }) => ({
                        type: ActionTypes.Edit_email_success,
                        payload: {
                            email: update.email,
                            hbId: update.studentId,
                        },
                    })),
                    tap(() => {
                        // this.messageService.updateSuccess.next();
                    }),
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                )
        )
    );

    @Effect()
    activateStudent = this.actions.pipe(
        ofType(ActionTypes.Activate_student),
        mergeMap((action: ActivateStudent) =>
            this.studentService.activateStudent(action.payload).pipe(
                map((student: { studentId: string }) => ({
                    type: ActionTypes.Activate_student_success,
                    payload: student.studentId,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next();
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    deactivateStudent = this.actions.pipe(
        ofType(ActionTypes.Deactivate_student),
        mergeMap((action: DeactivateStudent) =>
            this.studentService.deactivateStudent(action.payload).pipe(
                map((student: { studentId: string }) => ({
                    type: ActionTypes.Deactivate_student_success,
                    payload: student.studentId,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next();
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    addGrading = this.actions.pipe(
        ofType(ActionTypes.Add_grading),
        mergeMap((action: AddGrading) => {
            return this.studentService
                .addGrading(action.payload.student.hbId, action.payload.grading)
                .pipe(
                    map(student => {
                        return {
                            type: ActionTypes.Add_grading_success,
                            payload: student,
                        };
                    }),
                    catchError(err => {
                        this.handleError(err.message);
                        return EMPTY;
                    })
                );
        })
    );

    @Effect()
    removeGrading = this.actions.pipe(
        ofType(ActionTypes.Remove_grading),
        mergeMap((action: RemoveGrading) => {
            return this.studentService
                .removeGrading(
                    action.payload.student.hbId,
                    action.payload.grading
                )
                .pipe(
                    map(student => {
                        return {
                            type: ActionTypes.Remove_grading_success,
                            payload: student,
                        };
                    }),
                    catchError(err => {
                        this.handleError(err.message);
                        return EMPTY;
                    })
                );
        })
    );

    @Effect()
    activateStudentInApp = this.actions.pipe(
        ofType(ActionTypes.Activate_student_in_app),
        mergeMap((action: ActivateStudentInApp) =>
            this.studentService.activateStudentInApp(action.payload).pipe(
                map((student: { studentId: string }) => ({
                    type: ActionTypes.Activate_student_in_app_success,
                    payload: student.studentId,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next();
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    deactivateStudentInApp = this.actions.pipe(
        ofType(ActionTypes.Deactivate_student_in_app),
        mergeMap((action: DeactivateStudentInApp) =>
            this.studentService.deactivateStudentInApp(action.payload).pipe(
                map((student: { studentId: string }) => ({
                    type: ActionTypes.Deactivate_student_in_app_success,
                    payload: student.studentId,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next();
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    createStudentLogin = this.actions.pipe(
        ofType(ActionTypes.Create_student_login),
        mergeMap((action: CreateStudentLogin) =>
            this.studentService.createAppLogin(action.payload).pipe(
                map((student: { studentId: string }) => ({
                    type: ActionTypes.Create_student_login_success,
                    payload: student.studentId,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next();
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    handleError(message) {
        this.messageService.updateError.next(message);
    }

    constructor(
        private actions: Actions,
        private router: Router,
        private studentService: StudentsServices,
        private messageService: MessagesService
    ) {}
}
