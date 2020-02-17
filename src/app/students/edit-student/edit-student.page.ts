import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.reducers';
import {AddNewStudent, EditStudent, ResetSelectedStudent, SetSelectedStudent} from '../state/students.actions';
import { selectSelectedStudent } from '../state/students.selectors';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentModel} from '../../common/models/student';
import {emptyValidator} from '../../common/validators/empty.validator';
import {classType, ClassTypes} from '../../common/models/class-types';
import * as moment from 'moment';
import {CapitialisePipe} from '../../common/pipes/capitialise.pipe';
import {MessagesService} from '../../messages/messages.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit, OnDestroy {

  validation_messages = {
    'firstname': [
      { type: 'required', message: 'First name is required' },
      { type: 'maxlength', message: 'First name cannot be more than 100 characters long' },
      { type: 'empty', message: 'First name is required' },
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required' },
      { type: 'maxlength', message: 'Last name cannot be more than 100 characters long' },
      { type: 'empty', message: 'Last name is required' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'maxlength', message: 'Email must be 100 characters or less' },
      { type: 'empty', message: 'Email is required' },
    ],
    'preferredClass': [
      { type: 'required', message: 'Preferred class is required' },
    ]
  };

  studentId: string;

  studentOb: Observable<any>;

  student: StudentModel = null;

  segment: string;

  editStudentForm: FormGroup = null;

  saveAttempted = false;

  classTypes: Array<classType> = [];


  constructor(
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public store: Store<AppState>,
      private fb: FormBuilder,
      private capitalise: CapitialisePipe,
      private messages: MessagesService,
      public navController: NavController,
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.studentId = params.get('studentId');
      this.studentOb = this.store.select(selectSelectedStudent(this.studentId));
    });

    this.initialiseForm();

    this.classTypes = [ClassTypes.Adults, ClassTypes.Family];

    this.studentOb.subscribe((student: StudentModel) => {
      this.student = student;
      this.editStudentForm = this.fb.group({
        firstname: [student.name.firstname, [Validators.maxLength(100), emptyValidator()]],
        lastname: [student.name.lastname, [Validators.maxLength(100), emptyValidator()]],
        email: [student.email, [Validators.email, Validators.maxLength(100), emptyValidator()]],
        preferredClass: [student.preferredClass, [Validators.required]],
      });
    });
  }

  ngOnDestroy() {
    // this.store.dispatch(new ResetSelectedStudent());
  }

  segmentChanged(something) {
    this.segment = something.detail.value;
  }

  save() {

    this.saveAttempted = true;
    if (this.editStudentForm.invalid) {
      this.messages.updateError.next('Looks like you have tried to submit an invalid form. Update the form and try again.');
    } else {
      const saveValues = this.editStudentForm.value;
      const student: StudentModel = {
        ...this.student,
        name: {
          firstname: this.capitalise.transform(saveValues.firstname.trim()), // TODO unit test capitalisation
          lastname: this.capitalise.transform(saveValues.lastname.trim()) // TODO unit test capitalisation
        },
        email: saveValues.email.trim(),
        preferredClass: saveValues.preferredClass,
      };

      this.store.dispatch(new EditStudent(student));
      this.router.navigate(['student/view/' + this.studentId]);
    }
  }

  cancel() {
    this.navController.navigateBack('student/view/' + this.studentId);
  }

  initialiseForm() {
    this.editStudentForm = this.fb.group({
      firstname: ['', [Validators.maxLength(100), emptyValidator()]],
      lastname: ['', [Validators.maxLength(100), emptyValidator()]],
      email: ['', [Validators.email, Validators.maxLength(100), emptyValidator()]],
      preferredClass: ['', [Validators.required]],
    });
  }

}
