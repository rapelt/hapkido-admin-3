import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.reducers';
import { ResetSelectedStudent, SetSelectedStudent } from '../state/students.actions';
import { selectSelectedStudent } from '../state/students.selectors';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit, OnDestroy {

  studentId: string;

  student: Observable<any>;

  segment: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: Store<AppState>
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.studentId = params.get('studentId');
      this.student = this.store.select(selectSelectedStudent(this.studentId));
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetSelectedStudent());
  }

  segmentChanged(something) {
    this.segment = something.detail.value;
  }

}
