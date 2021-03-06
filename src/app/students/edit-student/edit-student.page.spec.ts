// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { IonicModule } from '@ionic/angular';
// import { Store } from '@ngrx/app-store';
// import { MockStore, provideMockStore } from '@ngrx/app-store/testing';
// import { CommonComponentsModule } from '../../common/common-components.module';
// import { CapitialisePipe } from '../../common/pipes/capitialise.pipe';
// import { MessagesModule } from '../../messages/messages.module';
// import { MessagesService } from '../../messages/messages.service';

// import { EditStudentPage } from './edit-student.page';
// import { AuthLibModule } from 'hapkido-auth-lib';
// import { config } from '../../../environments/environment';
// import { popululdatedInitialState } from 'src/testing-helpers/test-technique-tags-student-media-classes-auth-state-helpter';

// describe('EditStudentPage', () => {
//     let component: EditStudentPage;
//     let fixture: ComponentFixture<EditStudentPage>;
//     let router: Router;
//     let messageService: MessagesService;

//     let app-store: MockStore<{
//         authentication: {
//             authenticationState: string;
//         };
//     }>;

//     const initialState = popululdatedInitialState();

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [EditStudentPage],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             imports: [
//                 FormsModule,
//                 ReactiveFormsModule,
//                 MessagesModule,
//                 BrowserModule,
//                 CommonComponentsModule,
//                 IonicModule.forRoot({
//                     _testing: true,
//                 }),
//                 AuthLibModule.forRoot(config),
//                 RouterTestingModule.withRoutes([]),
//             ],
//             providers: [provideMockStore({ initialState }), CapitialisePipe],
//         }).compileComponents();

//         fixture = TestBed.createComponent(EditStudentPage);
//         component = fixture.componentInstance;
//         app-store = TestBed.inject(Store);
//         router = TestBed.inject(Router);
//         messageService = TestBed.inject(MessagesService);
//         spyOn(app-store, 'dispatch').and.callThrough();
//         fixture.detectChanges();
//     }));

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
