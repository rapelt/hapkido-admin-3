import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGradingComponent } from './add-grading/add-grading.component';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../common/common-components.module';

@NgModule({
    declarations: [AddGradingComponent],
    imports: [CommonModule, IonicModule, CommonComponentsModule],
})
export class GradingsModule {}
