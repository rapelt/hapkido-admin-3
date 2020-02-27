import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockPopOverController } from '../../../../testing-helpers/ionic.mocks';
import { MockComponent } from '../../../../testing-helpers/mock.component';
import { StudentListPopoverComponent } from './student-list-popover.component';

describe('StudentListPopoverComponent', () => {
    let component: StudentListPopoverComponent;
    let fixture: ComponentFixture<StudentListPopoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StudentListPopoverComponent, MockComponent],
            imports: [
                IonicModule,
                RouterTestingModule.withRoutes([
                    { path: 'student/list/:active', component: MockComponent },
                ]),
            ],
            providers: [
                {
                    provide: PopoverController,
                    useValue: new MockPopOverController(),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentListPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should dismiss popover on route change', fakeAsync(() => {
    //   const mockPopoverController = component.popoverCtrl as any as MockPopOverController;
    //   const router = TestBed.get(Router);
    //
    //
    //   spyOn(router, 'navigateByUrl').and.callThrough();
    //
    //   mockPopoverController.create({
    //     component: MockComponent,
    //     translucent: true
    //   });
    //
    //   fixture.detectChanges();
    //   expect(mockPopoverController.getLast().visible).toBeFalsy();
    //
    //   component.goToDeactivatedStudents();
    //   tick(1000);
    //
    //   expect(mockPopoverController.getLast().visible).toBeFalsy();
    //   expect(router.navigateByUrl).toHaveBeenCalledWith('/student/list/inactive');
    //
    // }));
});
