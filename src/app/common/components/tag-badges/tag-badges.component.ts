import { Component, Input, OnInit } from '@angular/core';
import { TagsServices } from '../../../app-store/tags-state/tags.services';
import { filter, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import {
    selectTagLoaded,
    selectTags,
} from '../../../app-store/tags-state/tags.selectors';
import { AppState } from '../../../app-store/state/app.reducers';
import { TagModel } from '../../models/tag';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-tag-badges',
    templateUrl: './tag-badges.component.html',
    styleUrls: ['./tag-badges.component.scss'],
})
export class TagBadgesComponent implements OnInit {
    loaded = false;

    @Input()
    selectedTags: number[];

    tags: TagModel[];

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.pipe(select(selectTags)).subscribe(tags => {
            this.tags = tags;
        });

        this.store.pipe(map(selectTagLoaded)).subscribe(allValuesLoaded => {
            this.loaded = allValuesLoaded;
        });
    }

    getTag(id) {
        return this.tags.find(atag => atag.id === id);
    }
}
