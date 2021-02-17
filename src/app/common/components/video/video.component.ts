import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import videojs from 'video.js/dist/alt/video.core.novtt.js';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video-style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit, OnDestroy {
    @ViewChild('target', { static: true }) target: ElementRef;

    @Input() options: {
        sources: Array<{
            src: string;
            type: string;
        }>;
        poster: string;
    };

    player: videojs.Player;

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        console.log(window.innerHeight);
        console.log(window.innerWidth);

        const options = {
            sources: this.options.sources,
            poster: this.options.poster,
            preload: 'none',
            controls: true,
            height: window.innerHeight - 56,
            width: window.innerWidth,
        };
        this.player = videojs(
            this.target.nativeElement,
            options,
            function onPlayerReady() {
                console.log('onPlayerReady', this);
            }
        );
    }

    ngOnDestroy() {
        // destroy player
        if (this.player) {
            this.player.dispose();
        }
    }
}
