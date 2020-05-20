import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AppState } from '../state/app.reducers';
import { Store } from '@ngrx/store';
import { selectStudentAndClassFeatureLoaded } from './state/students.selectors';
import { GetAllClasses } from '../classes/state/classes.actions';
import { GetAllStudents } from './state/students.actions';

@Injectable()
export class StudentsDataDispatcher implements Resolve<any> {
    constructor(private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot) {
        this.store
            .select(selectStudentAndClassFeatureLoaded)
            .subscribe(allLoaded => {
                if (allLoaded) {
                    return {};
                } else {
                    this.store.dispatch(new GetAllClasses());
                    this.store.dispatch(new GetAllStudents());
                    return {};
                }
            });
    }
}
