import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../app-store/state/app.reducers';
import { Store } from '@ngrx/store';
import { UpdateMediaprogress } from '../../app-store/technique-state/techniques.actions';

@Injectable({
    providedIn: 'root',
})
export class SocketioService {
    socket = null;
    endpoint: string;

    constructor(private store: Store<AppState>) {
        this.endpoint = 'http://localhost:8090';
    }

    setupSocketConnection() {
        if (this.socket === null) {
            this.socket = io(this.endpoint);
        }
    }

    getServerUpdates() {
        this.setupSocketConnection();

        return new Observable(observer => {
            this.socket.on('connect_failed', () => {
                console.log(
                    'Sorry, there seems to be an issue with the connection!'
                );
            });

            this.socket.on('connect_error', () => {
                console.log(
                    'Sorry, there seems to be an issue with the connection!'
                );
            });

            this.socket.on('error', () => {
                console.log('Sorry, there seems to be an error!');
            });

            this.socket.on('uploadProgress', data => {
                console.log(data);
                this.store.dispatch(
                    new UpdateMediaprogress({
                        mediaId: data.mediaId,
                        progress: data.progress,
                        techniqueId: data.techniqueId,
                    })
                );
                observer.next(data);
            });

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
