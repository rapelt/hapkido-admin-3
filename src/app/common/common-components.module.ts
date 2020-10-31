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
import { DragDropDirective } from './directives/drag-drop.directive';
import { SocketioService } from './services/socketio.service';
import { AttendanceFilterPipePipe } from './pipes/attendance-filter-pipe.pipe';
import { ActiveStudentPipe } from './pipes/active-students.pipe';
import { StudentNameFilterPipe } from './pipes/student-name-filter.pipe';
import { TechniqueSetFilterPipe } from './pipes/technique-set-filter.pipe';
import { TechniqueFilterPipe } from './pipes/technique-filter.pipe';
import { MessageComponent } from './messages/message/message.component';
import { MessagesService } from './messages/messages.service';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { InputComponent } from './form-component/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './form-component/text-area/text-area.component';
import { SelectGradeComponent } from './form-component/select-grade/select-grade.component';
import { TagsComponent } from './form-component/tags/tags.component';

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
        DragDropDirective,
        AttendanceFilterPipePipe,
        ActiveStudentPipe,
        StudentNameFilterPipe,
        TechniqueSetFilterPipe,
        TechniqueFilterPipe,
        MessageComponent,
        SidePanelComponent,
        InputComponent,
        TextAreaComponent,
        SelectGradeComponent,
        TagsComponent,
    ],
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
    providers: [
        GradeHelper,
        TechniqueSetFilterService,
        SocketioService,
        MessagesService,
    ],
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
        DragDropDirective,
        AttendanceFilterPipePipe,
        ActiveStudentPipe,
        StudentNameFilterPipe,
        TechniqueSetFilterPipe,
        TechniqueFilterPipe,
        MessageComponent,
        SidePanelComponent,
        InputComponent,
        TextAreaComponent,
        SelectGradeComponent,
        TagsComponent,
    ],
})
export class CommonComponentsModule {}
