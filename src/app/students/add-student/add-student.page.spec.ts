import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthenticationGuard } from '../../authentication/authentication.guard';
import { CommonComponentsModule } from '../../common/common-components.module';
import { CapitialisePipe } from '../../common/pipes/capitialise.pipe';
import { MessagesModule } from '../../messages/messages.module';
import { MessagesService } from '../../messages/messages.service';

import { AddStudentPage } from './add-student.page';

describe('AddStudentPage', () => {
  let component: AddStudentPage;
  let fixture: ComponentFixture<AddStudentPage>;
  let router: Router;
  let messageService: MessagesService;

  let store: MockStore<{ authentication: {
      authenticationState: string,
    }
  }>;

  const initialState = {
    students: {
      students: [],
      selectedStudent: null,
      families: []
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MessagesModule,
        BrowserModule,
        CommonComponentsModule,
        IonicModule.forRoot({
          _testing: true
        }),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        provideMockStore({ initialState }),
        CapitialisePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentPage);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    messageService = TestBed.get(MessagesService);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect back to student list when cancel clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const route = {
      path: null,
      canLoad: [AuthenticationGuard],
    };

    component.cancel();

    expect(navigateSpy).toHaveBeenCalledWith('/student/list/active', {});
  });

  it('should display error message when form invalid', () => {

    spyOn(messageService.updateError, 'next').and.callThrough();

    component.save();

    expect(messageService.updateError.next)
      .toHaveBeenCalledWith(
        'Looks like you have tried to submit an invalid form. Update the form and try again.'
      );
  });

});
