import { Component, OnInit } from '@angular/core';
import { config } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.reducers';
import { ClassesHelper } from '../classes/classes.helper';
import { Router } from '@angular/router';
import { ViewClass } from '../classes/state/classes.actions';
import { getClassState } from '../classes/state/classes.selectors';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    env = '';
    subscriber;

    date = new Date();
    classesOnDay: any = [];

    constructor(
        public store: Store<AppState>,
        public classHelper: ClassesHelper,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.env = config.environmentName;

        this.subscriber = this.store
            .select(getClassState)
            .pipe()
            .subscribe(classState => {
                this.classesOnDay = this.classHelper.getClassesOnDay(
                    new Date(),
                    classState.classes
                );
            });
    }

    classSelected(selectedClass) {
        this.store.dispatch(new ViewClass(selectedClass));
        this.router.navigateByUrl('attendance/' + selectedClass.classId);
        // this.navCtrl.push(this.viewClassPage);
    }
}
