import {
    HttpClient,
    HttpEventType,
    HttpHeaders,
    HttpParams,
    HttpRequest,
    HttpXhrBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';
import { MediaModel } from '../../common/models/media';
import { from, Observable, of } from 'rxjs';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { Media } from 'aws-sdk/clients/transcribeservice';
import { HTTPOptions } from 'aws-sdk';
const aws = require('aws-sdk');
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
