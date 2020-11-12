import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-popover-menu',
    templateUrl: './popover-menu.component.html',
    styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {
    constructor(private popover: PopoverController) {}

    ngOnInit() {}

    view() {
        this.popover.dismiss('view');
    }

    edit() {
        this.popover.dismiss('edit');
    }

    delete() {
        this.popover.dismiss('delete');
    }

    ClosePopover() {
        this.popover.dismiss();
    }

    public onSelection() {}
}
