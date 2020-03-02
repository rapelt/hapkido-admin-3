import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    ActionTypes,
    GetAllClasses,
    MakeClassAGrading,
} from '../../../state/classes.actions';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.reducers';
import { Observable } from 'rxjs';
import { ClassModel } from '../../../../common/models/class';
import { GetAllStudents } from '../../../../students/state/students.actions';
import { selectSelectedClass } from '../../../state/classes.selectors';

@Component({
    selector: 'app-class-view-general',
    templateUrl: './class-view-general.component.html',
    styleUrls: ['./class-view-general.component.scss'],
})
export class ClassViewGeneralComponent implements OnInit, OnDestroy {
    classId: string;
    aclass: Observable<ClassModel>;
    segment: string;
    subsc;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {}

    ngOnInit() {
        this.segment = 'general';
        this.store.dispatch(new GetAllStudents());
        this.store.dispatch(new GetAllClasses());

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get('classId');
            this.aclass = this.store.select(selectSelectedClass(this.classId));
        });

        this.subsc = this.actionsSubject.subscribe(data => {
            console.log(data.type);
            if (data.type === ActionTypes.Delete_class_success) {
                this.router.navigateByUrl('class');
            }
        });
    }

    makeClassGrading() {
        this.store.dispatch(new MakeClassAGrading(this.classId));
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
