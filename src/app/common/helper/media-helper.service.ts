import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MediaHelperService {
    constructor() {}

    isVideo(mediaType: string): boolean {
        const exists = ['avi', 'mpeg', 'mp4'].findIndex(m => m === mediaType);
        return exists !== -1;
    }

    isPhoto(mediaType: string): boolean {
        const exists = ['jpg', 'gif', 'jpeg', 'png', 'pjpeg'].findIndex(
            m => m === mediaType
        );
        return exists !== -1;
    }

    isDocument(mediaType: string): boolean {
        const exists = ['pdf', 'msword', 'doc'].findIndex(m => m === mediaType);
        return exists !== -1;
    }

    whatType(mimeType: string): string {
        let filetype;
        switch (mimeType) {
            case 'jpg':
            case 'gif':
            case 'jpeg':
            case 'png':
            case 'pjpeg':
                filetype = 'photos';
                break;
            case 'avi':
            case 'mpeg':
            case 'mp4':
                filetype = 'videos';
                break;
            case 'pdf':
            case 'msword':
            case 'doc':
                filetype = 'documents';
                break;
            default:
                filetype = 'none';
                break;
        }

        return filetype;
    }

    getVideoThumbnail(media) {
        return media.url + 'Thumbnails/' + media.file_name + '.0000000.jpg';
    }
}
