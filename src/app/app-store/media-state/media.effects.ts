import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, EMPTY, Observable } from 'rxjs';
import { catchError, delay, map, mergeMap, take, tap } from 'rxjs/operators';
import { MessagesService } from '../../common/messages/messages.service';
import { MediaServices } from './media.services';
import {
    ActionTypes,
    AddNewMedia,
    GetMedia,
    UploadNewMedia,
} from './media.actions';
import { ActionTypes as techActionTypes } from '../technique-state/techniques.actions';
import { MediaModel } from '../../common/models/media';
import { HttpEventType } from '@angular/common/http';
import { AppState } from '../state/app.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class MediaEffects {
    @Effect()
    getAllMedias = this.actions.pipe(
        ofType(ActionTypes.Get_all_medias),
        mergeMap(() =>
            this.mediaServices.getAllMedias().pipe(
                map((medias: MediaModel[]) => ({
                    type: ActionTypes.Get_all_medias_success,
                    payload: medias,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    getMedia = this.actions.pipe(
        ofType(ActionTypes.Get_media),
        mergeMap((action: GetMedia) =>
            this.mediaServices.getMedia(action.payload).pipe(
                map((media: MediaModel) => ({
                    type: ActionTypes.Get_media_success,
                    payload: media,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    addNewMedia = this.actions.pipe(
        ofType(ActionTypes.Add_new_media),
        mergeMap((action: AddNewMedia) =>
            this.mediaServices.addNewMedia(action.payload.media).pipe(
                map((media: string) => ({
                    type: techActionTypes.Add_or_update_media,
                    payload: media,
                })),
                tap((response: any) => {}),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    uploadNewMedia = this.actions.pipe(
        ofType(ActionTypes.Upload_new_media),
        mergeMap((action: UploadNewMedia) =>
            this.mediaServices
                .uploadNewMedia(action.payload.fileData, action.payload.media)
                .pipe(
                    map(events => {
                        console.log('Media Effects', events);
                        // if (events.type === HttpEventType.UploadProgress) {
                        //     // const fileUploadProgress =
                        //     //     Math.round(
                        //     //         (events.loaded / events.total) * 100
                        //     //     ) + '%';
                        //     // console.log('file progress', fileUploadProgress);
                        //     // return {
                        //     //     type: techActionTypes.Add_or_update_media,
                        //     //     payload: action.payload.media,
                        //     // };
                        // } else if (events.type === HttpEventType.Response) {
                        //     console.log(events.body);
                        //     return {
                        //         type: techActionTypes.Add_or_update_media,
                        //         payload: action.payload.media,
                        //     };
                        // }
                        return {
                            type: ActionTypes.Do_nothing,
                        };
                    }),
                    this.tapOnce((response: any) => {
                        this.store.dispatch(
                            new AddNewMedia({ media: action.payload.media })
                        );
                    }),
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                )
        )
    );

    tapOnce<T>(fn: (value) => void) {
        return (source: Observable<T>) => {
            source
                .pipe(
                    take(1),
                    delay(500),
                    tap(value => fn(value))
                )
                .subscribe();

            return source;
        };
    }

    handleError(message) {
        console.log(message);
        this.messageService.updateError.next(message);
    }

    constructor(
        private actions: Actions,
        private router: Router,
        private mediaServices: MediaServices,
        private messageService: MessagesService,
        private store: Store<AppState>
    ) {}
}
