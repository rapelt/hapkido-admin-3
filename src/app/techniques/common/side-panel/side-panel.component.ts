import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent implements OnInit {
    @Input()
    sidePaneOpen = false;

    @Input()
    title: string;

    @Output()
    closeSidePanel = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}
}
