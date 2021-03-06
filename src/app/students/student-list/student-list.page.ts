import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { StudentListPopoverComponent } from '../components/student-list-popover/student-list-popover.component';
import { selectStudentLoaded } from '../../app-store/student-state/students.selectors';
import { map, takeWhile } from 'rxjs/operators';
import { PageComponent } from '../../common/page.component';
import { Observable, of } from 'rxjs';
import { StudentModel } from '../../common/models/student';

@Component({
    selector: 'app-student-list-page',
    templateUrl: './student-list.page.html',
    styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage extends PageComponent
    implements OnInit, OnDestroy {
    listType = '';
    searchvalue = '';
    activatedRouteSubscriber;
    loaded = false;
    students: Observable<StudentModel[]> = of([]);

    constructor(
        public popoverController: PopoverController,
        public router: Router,
        public store: Store<AppState>,
        public activatedRoute: ActivatedRoute
    ) {
        super();
    }

    ngOnInit() {
        this.activatedRouteSubscriber = this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.listType = params.get('active');
            }
        );

        this.store
            .pipe(
                map(selectStudentLoaded),
                takeWhile(() => this.isAlive)
            )
            .subscribe(allValuesLoaded => {
                this.loaded = allValuesLoaded;
            });
    }

    async showMore(ev) {
        const popover = await this.popoverController.create({
            component: StudentListPopoverComponent,
            event: ev,
            translucent: true,
        });
        return popover.present();
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

    studentClicked(studentId: string) {
        this.router.navigate(['student/view/' + studentId]);
    }
}
