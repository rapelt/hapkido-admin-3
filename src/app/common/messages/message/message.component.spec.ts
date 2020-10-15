import { CommonModule } from '@angular/common';
import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { MockToastController } from '../../../../testing-helpers/ionic.mocks';

import { MessageComponent } from './message.component';
import { doesNotReject } from 'assert';

describe('MessageComponent', () => {
    let component: MessageComponent;
    let fixture: ComponentFixture<MessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageComponent],
            imports: [CommonModule, BrowserModule, IonicModule],

            providers: [
                {
                    provide: ToastController,
                    useValue: new MockToastController(),
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MessageComponent);
        component = fixture.componentInstance;

        component.messagesService.updateError = new Subject();
        component.messagesService.updateSuccess = new Subject();
        component.messagesService.updateInfo = new Subject();

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show error toast', fakeAsync(() => {
        const mockToastController = (component.toastCtrl as any) as MockToastController;
        component.ngOnInit();

        component.messagesService.updateError.next('error');

        tick(1000);

        expect(mockToastController.getLast().visible).toBeTruthy();
        expect(mockToastController.getLast().message).toBe('error');
        expect(mockToastController.getLast().color).toBe('danger');
    }));

    it('should show info toast', fakeAsync(() => {
        const mockToastController = (component.toastCtrl as any) as MockToastController;
        component.ngOnInit();

        component.messagesService.updateInfo.next('info');

        tick(1000);

        expect(mockToastController.getLast().visible).toBeTruthy();
        expect(mockToastController.getLast().message).toBe('info');
        expect(mockToastController.getLast().color).toBe('warning');
    }));

    it('should show success toast', fakeAsync(() => {
        const mockToastController = (component.toastCtrl as any) as MockToastController;
        component.ngOnInit();

        component.messagesService.updateSuccess.next('winner');

        tick(1000);

        expect(mockToastController.getLast().visible).toBeTruthy();
        expect(mockToastController.getLast().message).toBe('winner');
        expect(mockToastController.getLast().color).toBe('success');
    }));
});
