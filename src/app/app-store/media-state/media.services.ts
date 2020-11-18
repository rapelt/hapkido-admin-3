import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';
import { MediaModel } from '../../common/models/media';

@Injectable({
    providedIn: 'root',
})
export class MediaServices {
    mediaUrl = 'http://localhost:8080/media/';

    constructor(private httpClient: HttpClient) {
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

    uploadNewMedia(fileData: FormData, media: Partial<MediaModel>) {
        console.log('Uploading Media');
        return this.httpClient.post(this.mediaUrl + 'upload', fileData, {
            reportProgress: true,
            observe: 'events',
        });
    }

    updateMedia(media: MediaModel) {
        return this.httpClient.post(
            this.mediaUrl + 'update/' + media.id,
            media
        );
    }
}
