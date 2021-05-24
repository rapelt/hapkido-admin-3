import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GraphsPage } from './graphs.page';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GraphDataHttp } from './graph-data.http';
import { GraphDataService } from './graph-data.service';

describe('GraphsPage', () => {
    let component: GraphsPage;
    let fixture: ComponentFixture<GraphsPage>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [GraphsPage],
                providers: [GraphDataHttp, GraphDataService],
                imports: [
                    IonicModule.forRoot(),
                    ReactiveFormsModule,
                    HttpClientTestingModule,
                ],
            }).compileComponents();

            fixture = TestBed.createComponent(GraphsPage);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
