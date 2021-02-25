import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'hapkido-auth-lib';
import { AttendanceComponent } from './attendance/attendance.component';
import { AddGradingComponent } from './gradings/add-grading/add-grading.component';
import { TechniquesDataDispatcher } from './techniques/techniques-data.resolver';
import { ClassesDataDispatcher } from './classes/classes-data.resolver';
import { StudentsDataDispatcher } from './students/students-data.resolver';
import { AdminGuard } from 'hapkido-auth-lib';

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
        canActivate: [AuthenticationGuard, AdminGuard],
        runGuardsAndResolvers: 'always',
        resolve: { data: ClassesDataDispatcher },
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
        canActivate: [AuthenticationGuard, AdminGuard],
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
        canActivate: [AuthenticationGuard, AdminGuard],
        runGuardsAndResolvers: 'always',
        resolve: { data: StudentsDataDispatcher },
    },
    {
        path: 'technique',
        loadChildren: () =>
            import('./techniques/techniques.module').then(
                m => m.TechniquesModule
            ),
        canActivate: [AuthenticationGuard, AdminGuard],
        runGuardsAndResolvers: 'always',
        resolve: { data: TechniquesDataDispatcher },
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
        canActivate: [AuthenticationGuard, AdminGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'student',
        loadChildren: () =>
            import('./students/students.module').then(m => m.StudentsModule),
        canActivate: [AuthenticationGuard, AdminGuard],
        runGuardsAndResolvers: 'always',
        resolve: { data: StudentsDataDispatcher },
    },
    {
        path: 'class',
        loadChildren: () =>
            import('./classes/classes.module').then(m => m.ClassesModule),
        canActivate: [AuthenticationGuard, AdminGuard],
        runGuardsAndResolvers: 'always',
        resolve: { data: ClassesDataDispatcher },
    },
    {
        path: 'graphs',
        loadChildren: () =>
            import('./graphs/graphs.module').then(m => m.GraphsPageModule),
        canActivate: [AuthenticationGuard, AdminGuard],
        runGuardsAndResolvers: 'always',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
