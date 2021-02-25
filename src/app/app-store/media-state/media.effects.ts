import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, take, tap } from 'rxjs/operators';
import { MessagesService } from '../../common/messages/messages.service';
import { MediaServices } from './media.services';
import {
    ActionTypes,
    AddNewMedia,
    EditMedia,
    GetMedia,
    UploadNewMedia,
    UploadNewMediaWithAuth,
} from './media.actions';
import { ActionTypes as techActionTypes } from '../technique-state/techniques.actions';
import { MediaModel } from '../../common/models/media';
import { HttpEventType } from '@angular/common/http';
import { AppState } from '../state/app.reducers';
import { Store } from '@ngrx/store';
import { MediaHelperService } from '../../common/helper/media-helper.service';

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
    editMedia = this.actions.pipe(
        ofType(ActionTypes.Edit_media),
        mergeMap((action: EditMedia) =>
            this.mediaServices.editMedia(action.payload).pipe(
                map((media: MediaModel) => ({
                    type: techActionTypes.Add_or_update_media,
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
        ofType(ActionTypes.Upload_new_media_with_auth),
        mergeMap((action: UploadNewMediaWithAuth) =>
            this.mediaServices
                .uploadNewMedia(
                    action.payload.fileData,
                    action.payload.media,
                    action.payload.auth
                )
                .pipe(
                    map(events => {
                        if (events.type === HttpEventType.UploadProgress) {
                            const newmedia = {
                                ...action.payload.media,
                                uploadStatus: Math.round(
                                    (events.loaded / events.total) * 100
                                ),
                                tags: [],
                            };
                            return {
                                type: techActionTypes.Add_or_update_media,
                                payload: newmedia,
                            };
                        } else if (events.type === HttpEventType.Response) {
                            const newmedia = {
                                ...action.payload.media,
                                uploadStatus: 'Uploaded',
                                tags: [],
                            };
                            return {
                                type: ActionTypes.Edit_media,
                                payload: newmedia,
                            };
                        }
                        return {
                            type: ActionTypes.Do_nothing,
                        };
                    }),
                    catchError(error => {
                        this.handleError(error.message);
                        const newmedia = {
                            ...action.payload.media,
                            uploadStatus: 'Failed',
                            tags: [],
                        };
                        return of({
                            type: ActionTypes.Edit_media,
                            payload: newmedia,
                        });
                    })
                )
        )
    );

    @Effect()
    getAuth = this.actions.pipe(
        ofType(ActionTypes.Upload_new_media),
        mergeMap((action: UploadNewMedia) => {
            return this.mediaServices
                .getAuth(
                    action.payload.media.file_name +
                        '.' +
                        action.payload.media.file_type,
                    action.payload.fileData.type,
                    this.mediaHelper.whatType(
                        action.payload.media.file_type
                    ) === 'videos'
                        ? 'inputs/' + action.payload.media.folder
                        : action.payload.media.folder,
                    this.mediaHelper.getBucket(action.payload.media.file_type),
                    action.payload.media
                )
                .pipe(
                    map((events: any) => {
                        return {
                            type: ActionTypes.Upload_new_media_with_auth,
                            payload: {
                                auth: events.result,
                                fileData: action.payload.fileData,
                                media: events.media,
                            },
                        };
                    }),
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                );
        })
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
        private store: Store<AppState>,
        private mediaHelper: MediaHelperService
    ) {}
}
