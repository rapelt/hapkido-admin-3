import { OnDestroy } from '@angular/core';

export abstract class PageComponent implements OnDestroy {
    protected isAlive = true;
    protected loaded = false;

    ngOnDestroy(): void {
        console.log('destroyed');
        this.isAlive = false;
    }
}
