import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../common/messages/messages.service';
import { MediaServices } from './media.services';
import {
    ActionTypes,
    AddNewMedia,
    GetMedia,
    UploadNewMedia,
} from './media.actions';
import { MediaModel } from '../../common/models/media';

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
            this.mediaServices
                .addNewMedia(action.payload.media, action.payload.file)
                .pipe(
                    map((media: string) => ({
                        type: ActionTypes.Add_new_media_success,
                        payload: media,
                    })),
                    tap((response: any) => {
                        this.messageService.updateSuccess.next(
                            'New media created'
                        );
                    }),
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
                .uploadNewMedia(action.payload.media, action.payload.file)
                .pipe(
                    map((media: string) => ({
                        type: ActionTypes.Upload_new_media_success,
                        payload: media,
                    })),
                    tap((response: any) => {
                        // this.messageService.updateSuccess.next(
                        //     'New media created'
                        // );
                    }),
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                )
        )
    );

    handleError(message) {
        console.log(message);
        this.messageService.updateError.next(message);
    }

    constructor(
        private actions: Actions,
        private router: Router,
        private mediaServices: MediaServices,
        private messageService: MessagesService
    ) {}
}
