import { Component, OnDestroy, OnInit } from '@angular/core';
import { config } from '../../environments/environment';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app-store/state/app.reducers';
import { ClassesHelper } from '../classes/classes.helper';
import { Router } from '@angular/router';
import {
    ClearLoadedClasses,
    GetAllClasses,
    ViewClass,
} from '../app-store/classes-state/classes.actions';
import { filter, map, takeWhile } from 'rxjs/operators';
import { PageComponent } from '../common/page.component';
import {
    ClearLoadedStudents,
    GetAllFamilies,
    GetAllStudents,
} from '../app-store/student-state/students.actions';
import { Observable } from 'rxjs';
import { ClassModel } from '../common/models/class';
import { selectHomeloaded, todaysClassSelector } from './home.selector';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends PageComponent implements OnInit, OnDestroy {
    env = '';
    loaded;

    date = new Date();
    classesOnDay: any = [];
    todaysClasses: Observable<ClassModel[]>;

    constructor(
        public store: Store<AppState>,
        public classHelper: ClassesHelper,
        public router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.env = config.environmentName;

        this.todaysClasses = this.store.pipe(
            filter(() => this.loaded),
            select(todaysClassSelector),
            takeWhile(() => this.isAlive)
        );

        this.store
            .pipe(
                takeWhile(() => this.isAlive),
                map(selectHomeloaded)
            )
            .subscribe(allValuesLoaded => {
                this.loaded = allValuesLoaded;
            });
    }

    classSelected(selectedClass) {
        this.store.dispatch(new ViewClass(selectedClass));
        this.router.navigateByUrl('attendance/' + selectedClass.classId);
    }

    addClass() {
        this.router.navigateByUrl('/class/add');
    }

    refreshData() {
        this.store.dispatch(new ClearLoadedClasses());
        this.store.dispatch(new ClearLoadedStudents());

        this.store.dispatch(new GetAllStudents());
        this.store.dispatch(new GetAllFamilies());
        this.store.dispatch(new GetAllClasses());
    }
}
