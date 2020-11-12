import { Component, Input, OnInit } from '@angular/core';
import { MediaModel } from '../../../common/models/media';

@Component({
    selector: 'app-upload-bar',
    templateUrl: './upload-bar.component.html',
    styleUrls: ['./upload-bar.component.scss'],
})
export class UploadBarComponent implements OnInit {
    @Input()
    media: MediaModel;

    constructor() {}

    ngOnInit() {}

    isNumber() {
        return typeof this.media.uploadStatus === 'number';
    }
}
