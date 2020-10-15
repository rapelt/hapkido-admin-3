import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';
import { TagModel } from '../../common/models/tag';

@Injectable({
    providedIn: 'root',
})
export class TagsServices {
    tagUrl = 'http://localhost:8080/tag/';

    constructor(private httpClient: HttpClient) {
        this.tagUrl = config['tagAPIEndpoint'];
    }

    getAllTags() {
        return this.httpClient.get(this.tagUrl + 'all');
    }

    addNewTag(tag: string) {
        return this.httpClient.post(this.tagUrl + 'create', tag);
    }

    editTag(tag: TagModel) {
        return this.httpClient.post(this.tagUrl + 'update/' + tag.id, tag);
    }
}
