import { HttpClient, HttpRequest, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';
import { MediaModel } from '../../common/models/media';
import * as aws from 'aws-sdk';
aws.config.update({
    region: 'ap-southeast-2',
});

@Injectable({
    providedIn: 'root',
})
export class MediaServices {
    mediaUrl = 'http://localhost:8080/media/';

    constructor(
        private httpClient: HttpClient,
        private httpXHR: HttpXhrBackend
    ) {
        this.mediaUrl = config['APIEndpoint'] + 'media/';
    }

    getAllMedias() {
        return this.httpClient.get(this.mediaUrl + 'all');
    }

    getMedia(id) {
        return this.httpClient.get(this.mediaUrl + '' + id);
    }

    addNewMedia(media: Partial<MediaModel>) {
        return this.httpClient.post(this.mediaUrl + 'create', media);
    }

    editMedia(media: Partial<MediaModel>) {
        return this.httpClient.post(
            this.mediaUrl + 'update/' + media.id,
            media
        );
    }

    getAuth(filename, filetype, folder, bucket, media: Partial<MediaModel>) {
        return this.httpClient.post(this.mediaUrl + 'authenticateUploadMedia', {
            filename,
            filetype,
            folder,
            bucket,
            media,
        });
    }

    uploadNewMedia(fileData: any, media: Partial<MediaModel>, auth: any) {
        const req = new HttpRequest<unknown>('PUT', auth.form, fileData, {
            reportProgress: true,
        });

        return this.httpXHR.handle(req);
    }

    updateMedia(media: MediaModel) {
        return this.httpClient.post(
            this.mediaUrl + 'update/' + media.id,
            media
        );
    }
}
