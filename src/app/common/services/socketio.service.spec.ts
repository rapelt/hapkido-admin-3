import { TestBed } from '@angular/core/testing';

import { SocketioService } from './socketio.service';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('SocketioService', () => {
    const initialState = {
        students: {
            students: [],
            selectedStudent: null,
            families: [],
        },
    };

    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })],
        })
    );

    it('should be created', () => {
        const service: SocketioService = TestBed.inject(SocketioService);
        expect(service).toBeTruthy();
    });
});
