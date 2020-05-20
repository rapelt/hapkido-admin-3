import { Component, OnDestroy, OnInit } from '@angular/core';
import { config } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.reducers';
import { ClassesHelper } from '../classes/classes.helper';
import { Router } from '@angular/router';
import {
    ClearLoadedClasses,
    GetAllClasses,
    ViewClass,
} from '../classes/state/classes.actions';
import {
    getClasses,
    getClassState,
    selectClassLoaded,
} from '../classes/state/classes.selectors';
import { takeWhile, withLatestFrom } from 'rxjs/operators';
import { PageComponent } from '../common/page.component';
import {
    ClearLoadedStudents,
    GetAllFamilies,
    GetAllStudents,
} from '../students/state/students.actions';

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

    constructor(
        public store: Store<AppState>,
        public classHelper: ClassesHelper,
        public router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.env = config.environmentName;

        this.store
            .select(selectClassLoaded)
            .pipe(
                takeWhile(loaded => this.isAlive && loaded),
                withLatestFrom(this.store.select(getClassState))
            )
            .subscribe(([loaded, classState]) => {
                this.loaded = loaded;
                this.classesOnDay = this.classHelper.getClassesOnDay(
                    new Date(),
                    classState.classes
                );
            });

        this.store
            .select(selectClassLoaded)
            .pipe(takeWhile(() => this.isAlive))
            .subscribe(loaded => {
                this.loaded = loaded;
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
