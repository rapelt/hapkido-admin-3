import { Component, Input, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';

interface Step {
    step: number;
    type: PageComponent[];
    description: string;
    element: any;
}

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
    @Input() numberOfSteps = 1;
    @Input() steps: Step[];

    currentStepIndex = -1;
    constructor() {}

    ngOnInit() {}

    next(componentReference) {
        this.currentStepIndex = this.steps.findIndex(step => {
            const blarg = step.type.find((type: any) => {
                return componentReference instanceof type;
            });
            return blarg;
        });

        this.steps.forEach(step => {
            step.element = document.getElementById(step.step + '');
        });

        this.steps.forEach((step, index) => {
            if (this.currentStepIndex === index) {
                step.element.classList.remove('is-complete');
                step.element.classList.add('is-active');
            } else if (this.currentStepIndex > index) {
                step.element.classList.remove('is-active');
                step.element.classList.add('is-complete');
            } else if (this.currentStepIndex < index) {
                step.element.classList.remove('is-active');
                step.element.classList.remove('is-complete');
            }
        });
    }
}
