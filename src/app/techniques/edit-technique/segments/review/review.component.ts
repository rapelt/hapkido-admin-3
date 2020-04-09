import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.reducers';
import { SetSelectedTechnique } from '../../../state/techniques.actions';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
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
        this.router.navigateByUrl('technique/list');
    }

    back() {
        this.router.navigateByUrl(
            'technique/edit/' + this.techniqueId + '/photos'
        );
    }

    save() {
        this.next();
    }
}
