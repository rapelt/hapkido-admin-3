import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
    @Input()
    options: {
        src: string;
        altText: string;
        size: {
            maxWidth: string;
            maxHeight: string;
        };
    } = {
        src: '',
        altText: '',
        size: {
            maxHeight: 'auto',
            maxWidth: 'auto',
        },
    };

    constructor() {}

    ngOnInit() {}
}
