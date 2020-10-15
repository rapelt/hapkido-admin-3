import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagsState } from './tags.reducers';
import * as fromTags from './tags.reducers';

export const getTagsState = createFeatureSelector<TagsState>(
    fromTags.TECHNIQUES_FEATURE_NAME
);

export const selectTags = createSelector(getTagsState, tagsState => {
    return tagsState.tags;
});

export const selectTagLoaded = createSelector(getTagsState, tagsState => {
    return tagsState.loaded;
});

export const selectSelectedTag = (id: number) =>
    createSelector(getTagsState, tagsState => {
        if (tagsState.tags.length === 0) {
            return null;
        }

        return tagsState.tags.find(s => {
            return s.id === id;
        });
    });
