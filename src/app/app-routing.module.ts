import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canLoad: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'

  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    canLoad: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule),
    canLoad: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'student',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    canLoad: [AuthenticationGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  { path: 'classes', loadChildren: () => import('./classes/classes.module').then(m => m.ClassesPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
