import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    ActionTypes,
    DeleteClass,
} from '../../app-store/classes-state/classes.actions';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { ClassModel } from '../../common/models/class';
import { Observable } from 'rxjs';
import { selectSelectedClass } from '../../app-store/classes-state/classes.selectors';

@Component({
    selector: 'app-view-class',
    templateUrl: './view-class.component.html',
    styleUrls: ['./view-class.component.scss'],
})
export class ViewClassComponent implements OnInit, OnDestroy {
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

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get('classId');
            this.updateClass();
        });

        this.subsc = this.actionsSubject.subscribe(data => {
            if (data.type === ActionTypes.Delete_class_success) {
                this.router.navigateByUrl('class');
            }
        });
    }

    updateClass() {
        this.aclass = this.store.select(selectSelectedClass(this.classId));
    }

    edit() {
        this.router.navigateByUrl('class/edit/' + this.classId);
    }

    segmentChanged(event) {
        this.segment = event.detail.value;
    }

    delete() {
        this.store.dispatch(new DeleteClass(this.classId));
    }

    attendance() {
        this.router.navigateByUrl('attendance/' + this.classId);
    }

    grading() {
        this.router.navigateByUrl('gradings/' + this.classId);
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
