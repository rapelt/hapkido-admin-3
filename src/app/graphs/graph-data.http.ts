import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GraphDataHttp {
    url = 'http://localhost:8080/graph/';

    constructor(private httpClient: HttpClient) {
        this.url = config['APIEndpoint'] + 'graph/';
    }

    getAllData() {
        return this.httpClient.get(this.url + 'all');
    }

    getDataBetweenDates(dates: { start: Date; finish: Date }) {
        return this.httpClient.post(this.url + 'dates', dates);
    }
}
