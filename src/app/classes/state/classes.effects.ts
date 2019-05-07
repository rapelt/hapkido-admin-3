import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ClassModel } from '../../common/models/class';
import { MessagesService } from '../../messages/messages.service';
import { ActionTypes } from './classes.actions';
import { ClassesServices } from './classes.services';
import * as moment from 'moment';

@Injectable()
export class ClassesEffects {

  @Effect()
  getAllClasses = this.actions
    .pipe(
      ofType(ActionTypes.Get_all_classes),
      mergeMap(() => this.classesService.getAllClasses()
        .pipe(
          map((classes: Array<ClassModel>) => {
            const newClasses = [];

            classes.forEach((aclass) => {
              const newClass: ClassModel = {
                classId: aclass.classId,
                classType: aclass.classType,
                attendance: aclass.attendance,
                isGrading: aclass.isGrading,
                date: moment(aclass.date),
                startTime: aclass.startTime
              };

              newClasses.push(newClass);
            });

            return { type: ActionTypes.Get_all_classes_success, payload: newClasses };
          },
          catchError((error) => {
            this.handleError(error.message);
            return EMPTY;
          })
        )
    )));

  handleError(message) {
    console.log(message);
    this.messageService.updateError.next(message);
  }

  constructor(
    private actions: Actions,
    private router: Router,
    private classesService: ClassesServices,
    private messageService: MessagesService
  ) {

  }

}
