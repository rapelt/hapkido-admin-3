import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { StudentListPopoverComponent } from '../components/student-list-popover/student-list-popover.component';

@Component({
  selector: 'app-student-list-page',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  listType = '';
  searchvalue = '';

  constructor(
    public popoverController: PopoverController,
    public router: Router,
    public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.listType = params.get('active');
    });
  }

  async showMore(ev) {
    const popover = await this.popoverController.create({
      component: StudentListPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  searchInput(event) {
    this.searchvalue = event.detail.value;
  }

  cancelSearch() {
    this.searchvalue = '';
  }

  addStudent() {
    this.router.navigate(['student/add']);
  }

}
