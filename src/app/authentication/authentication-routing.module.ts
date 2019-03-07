import { Routes } from '@angular/router';
import { AuthenticationPage } from './authentication.page';

export const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInPageModule' },
  { path: 'force-password-change', loadChildren: './force-password-change/force-password-change.module#ForcePasswordChangePageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
];
