import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../messages/messages.service';
import {
    ActionTypes,
    AddNewPhoto,
    AddNewVideo,
    GetPhoto,
    GetVideo,
    UploadNewVideo,
} from './media.actions';
import { VideoModel } from '../../common/models/video';
import { PhotoModel } from '../../common/models/photo';
import { MediaServices } from './media.services';

@Injectable()
export class MediaEffects {
    @Effect()
    getAllVideos = this.actions.pipe(
        ofType(ActionTypes.Get_all_videos),
        mergeMap(() =>
            this.mediaServices.getAllVideos().pipe(
                map((videos: VideoModel[]) => ({
                    type: ActionTypes.Get_all_videos_success,
                    payload: videos,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    getAllPhotos = this.actions.pipe(
        ofType(ActionTypes.Get_all_photos),
        mergeMap(() =>
            this.mediaServices.getAllPhotos().pipe(
                map((photos: PhotoModel[]) => ({
                    type: ActionTypes.Get_all_photos_success,
                    payload: photos,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    getVideo = this.actions.pipe(
        ofType(ActionTypes.Get_video),
        mergeMap((action: GetVideo) =>
            this.mediaServices.getVideo(action.payload).pipe(
                map((video: VideoModel) => ({
                    type: ActionTypes.Get_video_success,
                    payload: video,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    getPhoto = this.actions.pipe(
        ofType(ActionTypes.Get_photo),
        mergeMap((action: GetPhoto) =>
            this.mediaServices.getPhoto(action.payload).pipe(
                map((photo: PhotoModel) => ({
                    type: ActionTypes.Get_photo_success,
                    payload: photo,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    addNewVideo = this.actions.pipe(
        ofType(ActionTypes.Add_new_video),
        mergeMap((action: AddNewVideo) =>
            this.mediaServices
                .addNewVideo(action.payload.video, action.payload.file)
                .pipe(
                    map((video: string) => ({
                        type: ActionTypes.Add_new_video_success,
                        payload: video,
                    })),
                    tap((response: any) => {
                        this.messageService.updateSuccess.next(
                            'New video created'
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
    uploadNewVideo = this.actions.pipe(
        ofType(ActionTypes.Upload_new_video),
        mergeMap((action: UploadNewVideo) =>
            this.mediaServices
                .uploadNewVideo(action.payload.video, action.payload.file)
                .pipe(
                    map((video: string) => ({
                        type: ActionTypes.Upload_new_video_success,
                        payload: video,
                    })),
                    tap((response: any) => {
                        // this.messageService.updateSuccess.next(
                        //     'New video created'
                        // );
                    }),
                    catchError(error => {
                        this.handleError(error.message);
                        return EMPTY;
                    })
                )
        )
    );

    @Effect()
    addNewPhoto = this.actions.pipe(
        ofType(ActionTypes.Add_new_photo),
        mergeMap((action: AddNewPhoto) =>
            this.mediaServices
                .addNewPhoto(action.payload.photo, action.payload.file)
                .pipe(
                    map((photo: string) => ({
                        type: ActionTypes.Add_new_photo_success,
                        payload: photo,
                    })),
                    tap((response: any) => {
                        this.messageService.updateSuccess.next(
                            'New photo created'
                        );
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
