import { OnDestroy, OnInit } from '@angular/core';
import { Observable, Unsubscribable } from 'rxjs';
import { CombineSubscriptions } from 'ngx-destroy-subscribers';

export abstract class PageComponent implements OnDestroy {
    @CombineSubscriptions()
    public subscriber: Unsubscribable;

    protected isAlive = true;
    public loaded = false;

    ngOnDestroy(): void {
        this.isAlive = false;
    }
}
