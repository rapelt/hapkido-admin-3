import { Routes } from '@angular/router';
import { ResetPasswordGuard } from './reset-password.guard';

export const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'force-password-change',
    loadChildren: () => import('./force-password-change/force-password-change.module').then(m => m.ForcePasswordChangePageModule),
    canLoad: [ResetPasswordGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
];
