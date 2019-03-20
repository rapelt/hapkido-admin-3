import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { store } from '@angular/core/src/render3';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { MockAlertController, MockToastController } from '../../../ionic.mocks';
import { MessagesService } from '../messages.service';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      imports: [
        CommonModule,
        BrowserModule,
        IonicModule.forRoot({
          _testing: true
        }),
      ],

      providers: [
        {provide: ToastController, useValue: new MockToastController()}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;

    component.messagesService.updateError = new Subject();
    component.messagesService.updateSuccess = new Subject();
    component.messagesService.updateInfo = new Subject();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error toast', fakeAsync(() => {
    const mockToastController = component.toastCtrl as any as MockToastController;
    component.ngOnInit();

    component.messagesService.updateError.next('error');

    tick(1000);

    expect(mockToastController.getLast().visible).toBeTruthy();
    expect(mockToastController.getLast().message).toBe('error');
    expect(mockToastController.getLast().color).toBe('danger');
  }));

  it('should show info toast', fakeAsync(() => {
    const mockToastController = component.toastCtrl as any as MockToastController;
    component.ngOnInit();

    component.messagesService.updateInfo.next('info');

    tick(1000);

    expect(mockToastController.getLast().visible).toBeTruthy();
    expect(mockToastController.getLast().message).toBe('info');
    expect(mockToastController.getLast().color).toBe('warning');
  }));

  it('should show success toast', fakeAsync(() => {
    const mockToastController = component.toastCtrl as any as MockToastController;
    component.ngOnInit();

    component.messagesService.updateSuccess.next('winner');

    tick(1000);

    expect(mockToastController.getLast().visible).toBeTruthy();
    expect(mockToastController.getLast().message).toBe('winner');
    expect(mockToastController.getLast().color).toBe('success');
  }));
});
