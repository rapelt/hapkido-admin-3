import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingSpinnerService {
    loadingSpinner: Subject<boolean> = new Subject<boolean>();

    constructor() {}
}
