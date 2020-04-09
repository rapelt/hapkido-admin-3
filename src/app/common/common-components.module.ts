import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonItemSliding } from '@ionic/angular';
import { StudentListComponent } from './components/student-list/student-list.component';
import { GradeHelper } from './helper/grade/grade';
import { AlphabeticalFamilyPipe } from './pipes/alphabetical-family.pipe';
import { AlphabeticalStudentsPipe } from './pipes/alphabeticalstudents/alphabeticalstudents';
import { CapitialisePipe } from './pipes/capitialise.pipe';
import { GradeBadgeComponent } from './components/grade-badge/grade-badge.component';
import { ValidationErrorMessageComponent } from './components/validation-error-message/validation-error-message.component';
import { OrderDatesPipe } from './pipes/order-dates.pipe';
import { MissedClassWarningComponent } from './components/missed-class-warning/missed-class-warning.component';
import { IonCalendar } from './components/calendar/calendar';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { OrderGradingsPipe } from './pipes/order-gradings.pipe';
import { FilterByPreferredClassTypePipe } from './pipes/filterbypreferredclasstype/filterbypreferredclasstype';
import { PrioritiseSelectedClassPipe } from './pipes/prioritiseselectedclass/prioritiseselectedclass';
import { TechniqueSetFilterService } from './helper/technique-set-filter.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
    declarations: [
        StudentListComponent,
        CapitialisePipe,
        AlphabeticalStudentsPipe,
        GradeBadgeComponent,
        AlphabeticalFamilyPipe,
        ValidationErrorMessageComponent,
        OrderDatesPipe,
        IonCalendar,
        MissedClassWarningComponent,
        LoadingSpinnerComponent,
        OrderGradingsPipe,
        FilterByPreferredClassTypePipe,
        PrioritiseSelectedClassPipe,
        ProgressBarComponent,
    ],
    imports: [CommonModule, IonicModule],
    providers: [GradeHelper, TechniqueSetFilterService],
    exports: [
        StudentListComponent,
        CapitialisePipe,
        CommonModule,
        AlphabeticalStudentsPipe,
        AlphabeticalFamilyPipe,
        GradeBadgeComponent,
        ValidationErrorMessageComponent,
        OrderDatesPipe,
        MissedClassWarningComponent,
        IonCalendar,
        LoadingSpinnerComponent,
        OrderGradingsPipe,
        FilterByPreferredClassTypePipe,
        PrioritiseSelectedClassPipe,
        ProgressBarComponent,
    ],
})
export class CommonComponentsModule {}
