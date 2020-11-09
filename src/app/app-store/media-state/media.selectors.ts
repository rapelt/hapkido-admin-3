import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MediaState } from './media.reducers';
import * as fromMedia from './media.reducers';

export const getMediaState = createFeatureSelector<MediaState>(
    fromMedia.MEDIA_FEATURE_NAME
);
