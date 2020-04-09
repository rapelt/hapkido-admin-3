import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.reducers';
import { SetSelectedTechnique } from '../../../state/techniques.actions';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
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
            'technique/edit/' + this.techniqueId + '/review'
        );
    }

    back() {
        this.router.navigateByUrl(
            'technique/edit/' + this.techniqueId + '/videos'
        );
    }

    save() {
        this.next();
    }
}
