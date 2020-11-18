import { ActionTypes, MediaActions } from './media.actions';
import { MediaModel } from '../../common/models/media';
import { ClassModel } from '../../common/models/class';
import * as _ from 'underscore';
import { Media } from 'aws-sdk/clients/transcribeservice';
import { ClassesState } from '../classes-state/classes.reducers';

export const MEDIA_FEATURE_NAME = 'media';

export interface MediaState {
    medias: MediaModel[];
    mediasLoaded: boolean;
}

const initialState: MediaState = {
    medias: [],
    mediasLoaded: false,
};

export function mediaReducer(state = initialState, action: MediaActions) {
    switch (action.type) {
        // case ActionTypes.Get_all_medias_success:
        //     return {
        //         ...state,
        //         medias: action.payload,
        //         mediasLoaded: true,
        //     };
        // case ActionTypes.Add_new_media_success:
        //     return updateOrAddMedia(state, action.payload);
        default:
            return state;
    }
}

// function getIndexOfMedia(medias: MediaModel[], mediaId: number): number {
//     return _.findIndex(medias, { id: mediaId });
// }
//
// function getIndexOfMediaByName(medias: MediaModel[], fileName: string): number {
//     return _.findIndex(medias, { file_name: fileName });
// }

// function updateOrAddMedia(state, media): ClassesState {
//     let indexMedia = getIndexOfMediaByName(state.medias, media.file_name);
//
//     if (indexMedia === -1) {
//         indexMedia = state.medias.length;
//     }
//
//     const mediaToUpdate = {
//         ...state.medias[indexMedia],
//         ...media,
//     };
//
//     console.log(mediaToUpdate);
//
//     const medias = [...state.medias];
//     medias[indexMedia] = mediaToUpdate;
//     return {
//         ...state,
//         medias: medias,
//     };
// }
