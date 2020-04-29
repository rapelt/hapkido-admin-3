import { Component, OnInit } from '@angular/core';
import { SetSelectedTechnique } from '../../../state/techniques.actions';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.reducers';

@Component({
    selector: 'app-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private store: Store<AppState>
    ) {}

    techniqueId: number;

    ngOnInit() {
        this.activatedRoute.parent.params.subscribe((params: ParamMap) => {
            this.techniqueId = parseInt(params['techniqueId'], 10);
            this.store.dispatch(new SetSelectedTechnique(5));
        });
    }

    next() {
        this.router.navigateByUrl(
            'technique/edit/' + this.techniqueId + '/photos'
        );
    }

    back() {
        this.router.navigateByUrl(
            'technique/edit/' + this.techniqueId + '/general'
        );
    }

    save() {
        this.next();
    }

    newVideo() {
        this.router.navigateByUrl(
            'technique/edit/' + this.techniqueId + '/video/new'
        );
    }

    addVideo() {}
}
