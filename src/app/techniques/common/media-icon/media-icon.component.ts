import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-media-icon',
    templateUrl: './media-icon.component.html',
    styleUrls: ['./media-icon.component.scss'],
})
export class MediaIconComponent implements OnInit {
    @Input()
    filetype: string;

    type: string;

    constructor() {}

    ngOnInit() {}

    shouldDisplay(type) {
        switch (this.filetype) {
            case 'jpg':
            case 'gif':
            case 'jpeg':
            case 'png':
            case 'pjpeg':
                return 'image' === type;
            case 'avi':
            case 'mpeg':
            case 'mp4':
                return 'video' === type;
            case 'pdf':
            case 'msword':
            case 'doc':
                return 'document' === type;
            default:
                return 'none' === type;
        }
    }
}
