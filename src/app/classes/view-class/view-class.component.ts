import { Component, OnInit } from '@angular/core';
import { GetAllStudents } from '../../students/state/students.actions';
import { GetAllClasses, MakeClassAGrading } from '../state/classes.actions';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.reducers';
import { selectSelectedStudent } from '../../students/state/students.selectors';
import { ClassModel } from '../../common/models/class';
import { Observable } from 'rxjs';
import { selectSelectedClass } from '../state/classes.selectors';

@Component({
    selector: 'app-view-class',
    templateUrl: './view-class.component.html',
    styleUrls: ['./view-class.component.scss'],
})
export class ViewClassComponent implements OnInit {
    classId: string;
    aclass: Observable<ClassModel>;
    segment: string;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public store: Store<AppState>
    ) {}

    ngOnInit() {
        this.segment = 'general';
        this.store.dispatch(new GetAllStudents());
        this.store.dispatch(new GetAllClasses());

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get('classId');
            this.updateClass();
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

    makeClassGrading() {
        this.store.dispatch(new MakeClassAGrading(this.classId));
    }
}
