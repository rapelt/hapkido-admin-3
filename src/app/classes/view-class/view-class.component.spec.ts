import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewClassComponent } from './view-class.component';

describe('ViewClassComponent', () => {
    let component: ViewClassComponent;
    let fixture: ComponentFixture<ViewClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewClassComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
