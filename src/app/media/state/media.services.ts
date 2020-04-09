import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';
import { VideoModel } from '../../common/models/video';
import { PhotoModel } from '../../common/models/photo';

@Injectable({
    providedIn: 'root',
})
export class MediaServices {
    mediaUrl = 'http://localhost:8080/media/';

    constructor(private httpClient: HttpClient) {
        this.mediaUrl = config['APIEndpoint'] + 'media/';
    }

    getAllVideos() {
        return this.httpClient.get(this.mediaUrl + 'video/all');
    }

    getAllPhotos() {
        return this.httpClient.get(this.mediaUrl + 'photo/all');
    }

    getVideo(id) {
        return this.httpClient.get(this.mediaUrl + 'video/' + id);
    }

    getPhoto(id) {
        return this.httpClient.get(this.mediaUrl + 'photo/' + id);
    }

    addNewVideo(video: VideoModel, file: any) {
        return this.httpClient.post(this.mediaUrl + 'video/create', [
            video,
            file,
        ]);
    }

    addNewPhoto(photo: PhotoModel, file: any) {
        return this.httpClient.post(this.mediaUrl + 'photo/create', [
            photo,
            file,
        ]);
    }

    updateVideo(video: VideoModel) {
        return this.httpClient.post(
            this.mediaUrl + 'video/update/' + video.id,
            video
        );
    }

    updatePhoto(photo: PhotoModel) {
        return this.httpClient.post(
            this.mediaUrl + 'photo/update' + photo.id,
            photo
        );
    }
}
