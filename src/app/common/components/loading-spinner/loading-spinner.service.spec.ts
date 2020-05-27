import { TestBed } from '@angular/core/testing';

import { LoadingSpinnerService } from './loading-spinner.service';

describe('LoadingSpinnerService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: LoadingSpinnerService = TestBed.inject(
            LoadingSpinnerService
        );
        expect(service).toBeTruthy();
    });
});
