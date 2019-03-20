import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canLoad: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'

  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canLoad: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationPageModule'
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsPageModule',
    canLoad: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
