import {
    Component,
    Input,
    OnInit,
    Sanitizer,
    SecurityContext,
} from '@angular/core';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
    @Input()
    options: {
        src: string;
        altText: string;
    };

    constructor() {}

    ngOnInit() {
        console.log(this.options);
    }
}
