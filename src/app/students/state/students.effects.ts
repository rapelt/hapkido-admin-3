import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../messages/messages.service';
import { StudentModel } from '../models/student';
import {
  ActionTypes
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
