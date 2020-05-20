import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AppState } from '../state/app.reducers';
import { Store } from '@ngrx/store';
import { GetAllTags } from '../tags/state/tags.actions';
import { GetAllPhotos, GetAllVideos } from '../media/state/media.actions';
import { GetAllClasses } from './state/classes.actions';
import { GetAllStudents } from '../students/state/students.actions';
import { selectStudentAndClassFeatureLoaded } from '../students/state/students.selectors';

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
                    return {};
                }
            });
    }
}
