import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-student-list-popover',
  templateUrl: './student-list-popover.component.html',
  styleUrls: ['./student-list-popover.component.scss']
})
export class StudentListPopoverComponent implements OnInit {

  constructor(public router: Router, public popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  goToDeactivatedStudents() {
    this.router.navigateByUrl('/student/list/inactive');
    this.popoverCtrl.dismiss();
  }

}
