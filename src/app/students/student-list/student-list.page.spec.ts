import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRouteStub } from '../../../testing-helpers/activated-route-stub';
import {
    MockPopOverController,
    MockToastController,
} from '../../../testing-helpers/ionic.mocks';
import { CommonComponentsModule } from '../../common/common-components.module';

import { StudentListPage } from './student-list.page';
import { StudentsState } from '../state/students.reducers';
import { emptyInitialState } from '../../../testing-helpers/test-state-helpter';

describe('StudentListPage Active', () => {
    let component: StudentListPage;
    let fixture: ComponentFixture<StudentListPage>;
    let activatedRoute: ActivatedRouteStub;

    let store;

    const initialState = {
        ...emptyInitialState(),
        students: {
            students: [
                {
                    isActive: true,
                    name: { firstname: 'a', lastname: 'a' },
                    grade: 1,
                },
                {
                    isActive: true,
                    name: { firstname: 'b', lastname: 'b' },
                    grade: 1,
                },
                {
                    isActive: true,
                    name: { firstname: 'c', lastname: 'c' },
                    grade: 1,
                },
            ],
        },
    };

    beforeEach(async(() => {
        activatedRoute = new ActivatedRouteStub({ active: 'active' });
    }));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StudentListPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                CommonComponentsModule,
                IonicModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'students/list/:active',
                        component: StudentListPage,
                    },
                ]),
            ],
            providers: [
                {
                    provide: PopoverController,
                    useValue: new MockPopOverController(),
                },
                { provide: ActivatedRoute, useValue: activatedRoute },
                provideMockStore({ initialState }),
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(StudentListPage);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture.detectChanges();
    }));

    it('should create active list', async(() => {
        expect(component).toBeTruthy();
        expect(component.listType).toEqual('active');

        fixture.detectChanges();
        const app = fixture.nativeElement;
        const title = app.querySelector('ion-title');
        expect(title.textContent).toContain('Active Students');
    }));

    it('should create inactive list', async(() => {
        activatedRoute.setParamMap({ active: 'inactive' });
        expect(component).toBeTruthy();
        expect(component.listType).toEqual('inactive');

        fixture.detectChanges();
        const app = fixture.nativeElement;
        const title = app.querySelector('ion-title');
        expect(title.textContent).toContain('Inactive Students');
    }));

    it('should show popover', fakeAsync(() => {
        const mockPopoverController = (component.popoverController as any) as MockPopOverController;
        activatedRoute.setParamMap({ active: 'active' });
        expect(component.listType).toEqual('active');
        fixture.detectChanges();

        component.showMore(null);
        tick(1000);

        expect(mockPopoverController.getLast().visible).toBeTruthy();
    }));
});
