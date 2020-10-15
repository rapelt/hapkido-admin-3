// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import {
//     async,
//     ComponentFixture,
//     fakeAsync,
//     TestBed,
//     tick,
// } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { Store } from '@ngrx/app-store';
// import { MockStore, provideMockStore } from '@ngrx/app-store/testing';
// import { AuthenticationStates } from '../authentication/authentication-states';
// import {
//     SendEmailVerificationCode,
//     SignOut,
//     VerifyEmail,
// } from '../authentication/technique-tags-student-media-classes-auth-state/authentication.actions';
//
// import { SettingsPage } from './settings.page';
//
// describe('SettingsPage', () => {
//     let component: SettingsPage;
//     let fixture: ComponentFixture<SettingsPage>;
//
//     let app-store: MockStore<{
//         authentication: {
//             authenticationState: string;
//         };
//     }>;
//
//     const initialState = {
//         authentication: {
//             user: { username: 'admin' },
//             authenticationState: AuthenticationStates.LOGGEDOUT,
//             userAttributes: [
//                 { Name: 'sub', Value: '4a4eb79c-5898-4de7-8540-153515c25f80' },
//                 { Name: 'email', Value: 'rebekahapelt@gmail.com' },
//                 { Name: 'email_verified', Value: '' },
//             ],
//             username: 'admin',
//             session: null,
//         },
//     };
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [SettingsPage],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             imports: [IonicModule, FormsModule, ReactiveFormsModule],
//             providers: [provideMockStore({ initialState })],
//         }).compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(SettingsPage);
//         component = fixture.componentInstance;
//         app-store = TestBed.inject(Store);
//         spyOn(app-store, 'dispatch').and.callThrough();
//
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//
//     it('should have read only settings email not verified', fakeAsync(() => {
//         const initialEmailVerified = {
//             authentication: {
//                 user: { username: 'admin' },
//                 authenticationState: AuthenticationStates.LOGGEDOUT,
//                 userAttributes: [
//                     {
//                         Name: 'sub',
//                         Value: '4a4eb79c-5898-4de7-8540-153515c25f80',
//                     },
//                     { Name: 'email', Value: 'rebekahapelt@gmail.com' },
//                     { Name: 'email_verified', Value: 'false' },
//                 ],
//                 username: 'admin',
//                 session: null,
//             },
//         };
//
//         app-store.setState(initialEmailVerified);
//
//         tick();
//         component.ngOnInit();
//         fixture.detectChanges();
//
//         const app = fixture.nativeElement;
//         const username = app.querySelector('.ut-username').textContent;
//
//         const email = app.querySelector('.ut-email').textContent;
//         expect(email).toEqual('rebekahapelt@gmail.com (Not Verified)');
//     }));
//
//     it('should have read only settings email verified', fakeAsync(() => {
//         const initialEmailVerified = {
//             authentication: {
//                 user: { username: 'admin' },
//                 authenticationState: AuthenticationStates.LOGGEDOUT,
//                 userAttributes: [
//                     {
//                         Name: 'sub',
//                         Value: '4a4eb79c-5898-4de7-8540-153515c25f80',
//                     },
//                     { Name: 'email', Value: 'rebekahapelt@gmail.com' },
//                     { Name: 'email_verified', Value: 'true' },
//                 ],
//                 username: 'admin',
//                 session: null,
//             },
//         };
//
//         app-store.setState(initialEmailVerified);
//
//         tick();
//         component.ngOnInit();
//         fixture.detectChanges();
//
//         const app = fixture.nativeElement;
//         const username = app.querySelector('.ut-username').textContent;
//         expect(username).toEqual('admin');
//
//         const email = app.querySelector('.ut-email').textContent;
//         expect(email).toEqual('rebekahapelt@gmail.com ');
//     }));
//
//     it('should call SendEmailVerificationCode on send code', fakeAsync(() => {
//         expect(component.codeSent).toEqual(false);
//         component.sendCode();
//
//         const action = new SendEmailVerificationCode();
//
//         expect(app-store.dispatch).toHaveBeenCalledWith(action);
//         expect(component.codeSent).toEqual(true);
//     }));
//
//     it('should call SendEmailVerificationCode on send code', fakeAsync(() => {
//         component.verifyEmailSubmit();
//         const action = new VerifyEmail('');
//         expect(app-store.dispatch).toHaveBeenCalledWith(action);
//     }));
// });
