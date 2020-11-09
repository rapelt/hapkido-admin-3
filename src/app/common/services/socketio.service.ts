import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root',
})
export class SocketioService {
    socket = null;
    endpoint: string;

    constructor() {
        this.endpoint = 'http://localhost:8090';
    }

    setupSocketConnection() {
        this.socket = io(this.endpoint);
    }

    getServerUpdates() {
        if (this.socket === null) {
            this.setupSocketConnection();
        }

        return new Observable(observer => {
            this.socket.on('posts', data => {
                console.log(data);
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }
}
