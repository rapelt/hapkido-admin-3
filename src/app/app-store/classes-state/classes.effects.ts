import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as moment from 'moment';
import { EMPTY, of } from 'rxjs';
import {
    catchError,
    delay,
    exhaustMap,
    map,
    mergeMap,
    tap,
} from 'rxjs/operators';
import { ClassModel } from '../../common/models/class';
import { StudentModel } from '../../common/models/student';
import { MessagesService } from '../../common/messages/messages.service';
import {
    ActionTypes,
    AddClasses,
    AddStudentToClass,
    AddStudentToClassSuccess,
    DeleteClass,
    MakeClassAGrading,
    RemoveStudentFromClass,
    RemoveStudentFromClassSuccess,
} from './classes.actions';
import { ClassesServices } from './classes.services';
import { getClassState } from './classes.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.reducers';

@Injectable()
export class ClassesEffects {
    @Effect()
    getAllClasses = this.actions.pipe(
        ofType(ActionTypes.Get_all_classes),
        exhaustMap(() =>
            this.classesService.getAllClasses().pipe(
                map(
                    (classes: ClassModel[]) => {
                        const newClasses = [];

                        classes.forEach(aclass => {
                            const newClass: ClassModel = {
                                classId: aclass.classId,
                                classType: aclass.classType,
                                attendance: aclass.attendance,
                                isGrading: aclass.isGrading,
                                date: moment(aclass.date),
                                startTime: aclass.startTime,
                            };

                            newClasses.push(newClass);
                        });

                        return {
                            type: ActionTypes.Get_all_classes_success,
                            payload: newClasses,
                        };
                    },
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                )
            )
        )
    );

    @Effect()
    addClasses = this.actions.pipe(
        ofType(ActionTypes.Add_classes),
        mergeMap((action: AddClasses) =>
            this.classesService.addClasses(action.payload).pipe(
                map(
                    (classes: {
                        classes: ClassModel[];
                        classesNotCreated: string[];
                        errors: string[];
                    }) => {
                        this.generateCreateClassMessage(classes);

                        classes['classes'].forEach(aclass => {
                            aclass.date = moment(aclass.date);
                        });
                        return {
                            type: ActionTypes.Add_classes_success,
                            payload: classes.classes,
                        };
                    },
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                )
            )
        )
    );

    @Effect()
    deleteClasses = this.actions.pipe(
        ofType(ActionTypes.Delete_class),
        mergeMap((action: DeleteClass) =>
            this.classesService.deleteClass(action.payload).pipe(
                map(
                    (aClass: ClassModel) => {
                        return {
                            type: ActionTypes.Delete_class_success,
                            payload: aClass,
                        };
                    },
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                )
            )
        )
    );

    @Effect()
    addStudentToClass = this.actions.pipe(
        ofType(ActionTypes.Add_student_to_class),
        mergeMap((action: AddStudentToClass) =>
            this.classesService
                .addStudentToClass(
                    action.payload.classId,
                    action.payload.studentId
                )
                .pipe(
                    map(
                        (student: StudentModel) => {
                            return {
                                type: ActionTypes.Do_nothing,
                            };
                        },
                        catchError((error: any) => {
                            this.handleError(error.message);
                            return of(
                                new RemoveStudentFromClassSuccess(
                                    action.payload
                                )
                            );
                        })
                    )
                )
        )
    );

    @Effect()
    removeStudentFromClass = this.actions.pipe(
        ofType(ActionTypes.Remove_student_from_class),
        mergeMap((action: RemoveStudentFromClass) =>
            this.classesService
                .removeStudentFromClass(
                    action.payload.classId,
                    action.payload.studentId
                )
                .pipe(
                    map(
                        (student: StudentModel) => {
                            return {
                                type: ActionTypes.Do_nothing,
                            };
                        },
                        catchError(error => {
                            this.handleError(error.message);
                            return of(
                                new AddStudentToClassSuccess(action.payload)
                            );
                        })
                    )
                )
        )
    );

    @Effect()
    makeClassAGrading = this.actions.pipe(
        ofType(ActionTypes.Make_class_a_grading),
        mergeMap((action: MakeClassAGrading) =>
            this.classesService.makeClassAGrading(action.payload).pipe(
                map(
                    () => {
                        return {
                            type: ActionTypes.Make_a_class_a_grading_success,
                            payload: action.payload,
                        };
                    },
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                )
            )
        )
    );

    handleError(message) {
        console.log(message);
        this.messageService.updateError.next(message);
    }

    generateCreateClassMessage(classes): void {
        let message = '';
        if (classes['classes'].length > 0) {
            message =
                message + classes['classes'].length + ' classes created. ';
        }

        if (classes['classesNotCreated'].length > 0) {
            message =
                message +
                classes['classesNotCreated'].length +
                ' classes not created.';
        }

        this.messageService.updateSuccess.next(message);
    }

    constructor(
        private actions: Actions,
        private router: Router,
        private store: Store<AppState>,
        private classesService: ClassesServices,
        private messageService: MessagesService
    ) {}
}
