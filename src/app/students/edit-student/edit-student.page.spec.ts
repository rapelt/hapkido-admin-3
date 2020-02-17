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

import { EditStudentPage } from './edit-student.page';

describe('EditStudentPage', () => {
  let component: EditStudentPage;
  let fixture: ComponentFixture<EditStudentPage>;
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
      declarations: [ EditStudentPage ],
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
    fixture = TestBed.createComponent(EditStudentPage);
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

});
