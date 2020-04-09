import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard, AuthLibModule } from 'hapkido-auth-lib';
import { AttendanceComponent } from './attendance/attendance.component';
import { AddGradingComponent } from './gradings/add-grading/add-grading.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthenticationGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'authentication',
        loadChildren: () =>
            import('./authentication/authentication.module').then(
                m => m.AuthenticationWrapperModule
            ),
    },
    {
        path: 'sign-in',
        redirectTo: '/authentication/sign-in',
        pathMatch: 'full',
    },
    {
        path: 'settings',
        loadChildren: () =>
            import('./settings/settings.module').then(
                m => m.SettingsPageModule
            ),
        canActivate: [AuthenticationGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'attendance',
        children: [
            {
                path: ':classId',
                pathMatch: 'full',
                component: AttendanceComponent,
            },
        ],
        canActivate: [AuthenticationGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'technique',
        loadChildren: () =>
            import('./techniques/techniques.module').then(
                m => m.TechniquesModule
            ),
        canActivate: [AuthenticationGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'gradings',
        children: [
            {
                path: ':classId',
                pathMatch: 'full',
                component: AddGradingComponent,
            },
        ],
        canActivate: [AuthenticationGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'student',
        loadChildren: () =>
            import('./students/students.module').then(m => m.StudentsModule),
        canActivate: [AuthenticationGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'class',
        loadChildren: () =>
            import('./classes/classes.module').then(m => m.ClassesPageModule),
        canActivate: [AuthenticationGuard],
        runGuardsAndResolvers: 'always',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
