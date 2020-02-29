import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from '../../../app.component';
import { GradeHelper } from '../../helper/grade/grade';

import { GradeBadgeComponent } from './grade-badge.component';

describe('GradeBadgeComponent', () => {
    let component: GradeBadgeComponent;
    let fixture: ComponentFixture<GradeBadgeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GradeBadgeComponent],
            providers: [GradeHelper],
            imports: [IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(GradeBadgeComponent);
        component = fixture.componentInstance;
        component.grade = 1;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.grade).toEqual(1);
    });

    it('should use the grade short name', () => {
        expect(component).toBeTruthy();
        expect(component.grade).toEqual(1);

        const app = fixture.nativeElement;
        const badge = app.querySelector('.ut-short-name');
        expect(badge.textContent).toContain('Y1');
    });
});
