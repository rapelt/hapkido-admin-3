import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {

  newStudentForm: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.newStudentForm = this.fb.group({
      firstname: [],
      lastname: [],
      hbId: [],
      email: [],
      dob: [],
      joiningDate: [],
      grade: [],
      preferredClass: [],
      family: [],
      paymentType: []
    });

  }

  save() {}

  cancel() {}
}
