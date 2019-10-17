import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../messages/messages.service';
import { FamilyModel } from '../../common/models/family.model';
import { StudentModel } from '../../common/models/student';
import {
    ActionTypes, ActivateStudent, AddNewStudent, DeactivateStudent, EditStudent
} from './students.actions';
import { StudentsServices } from './students.services';

@Injectable()
export class StudentsEffects {

  @Effect()
  getAllStudents = this.actions
    .pipe(
      ofType(ActionTypes.Get_all_students),
      mergeMap(() => this.studentService.getAllStudents()
        .pipe(
          map((students: Array<StudentModel>) => ({ type: ActionTypes.Get_all_students_success, payload: students })),
          catchError((error) => {
            this.handleError(error.message);
            return EMPTY;
          })
        ))
    );

  @Effect()
  getAllFamilies = this.actions
    .pipe(
      ofType(ActionTypes.Get_all_families),
      mergeMap(() => this.studentService.getAllFamilies()
        .pipe(
          map((families: Array<FamilyModel>) => ({ type: ActionTypes.Get_all_families_success, payload: families })),
          catchError((error) => {
            this.handleError(error.message);
            return EMPTY;
          })
        ))
    );

  @Effect()
  addNewStudent = this.actions
    .pipe(
      ofType(ActionTypes.Add_new_student),
      mergeMap((action: AddNewStudent) => this.studentService.addNewStudent(action.payload)
        .pipe(
          map((student: Array<StudentModel>) => ({ type: ActionTypes.Add_new_student_success, payload: student })),
          tap(() => {
            this.messageService.updateSuccess.next('New student created');
          }),
          catchError((error) => {
            this.handleError(error.message);
            return EMPTY;
          })
        ))
    );

    @Effect()
    editStudent = this.actions
        .pipe(
            ofType(ActionTypes.Edit_student),
            mergeMap((action: EditStudent) => this.studentService.editStudent(action.payload)
                .pipe(
                    map((student: Array<StudentModel>) => ({ type: ActionTypes.Edit_student_success, payload: student })),
                    tap(() => {
                        // this.messageService.updateSuccess.next();
                    }),
                    catchError((error) => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                ))
        );

    @Effect()
    activateStudent = this.actions
        .pipe(
            ofType(ActionTypes.Activate_student),
            mergeMap((action: ActivateStudent) => this.studentService.activateStudent(action.payload)
                .pipe(
                    map((student: {studentId: string}) => ({ type: ActionTypes.Activate_student_success, payload: student.studentId })),
                    tap(() => {
                        // this.messageService.updateSuccess.next();
                    }),
                    catchError((error) => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                ))
        );

    @Effect()
    deactivateStudent = this.actions
        .pipe(
            ofType(ActionTypes.Deactivate_student),
            mergeMap((action: DeactivateStudent) => this.studentService.deactivateStudent(action.payload)
                .pipe(
                    map((student: {studentId: string}) => ({ type: ActionTypes.Deactivate_student_success, payload: student.studentId })),
                    tap(() => {
                        // this.messageService.updateSuccess.next();
                    }),
                    catchError((error) => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                ))
        );

  handleError(message) {
    console.log(message);
    this.messageService.updateError.next(message);
  }

  constructor(
    private actions: Actions,
    private router: Router,
    private studentService: StudentsServices,
    private messageService: MessagesService
  ) {

  }

}
