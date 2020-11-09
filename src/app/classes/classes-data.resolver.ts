import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AppState } from '../app-store/state/app.reducers';
import { Store } from '@ngrx/store';
import { GetAllClasses } from '../app-store/classes-state/classes.actions';
import {
    GetAllFamilies,
    GetAllStudents,
} from '../app-store/student-state/students.actions';
import { selectStudentAndClassFeatureLoaded } from '../app-store/student-state/students.selectors';

@Injectable()
export class ClassesDataDispatcher implements Resolve<any> {
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
                    this.store.dispatch(new GetAllFamilies());
                    return {};
                }
            });
    }
}
