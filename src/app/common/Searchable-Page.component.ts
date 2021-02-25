import { Directive, OnDestroy } from '@angular/core';
import { PageComponent } from './page.component';

// TODO: Add Angular decorator.
@Directive()
export abstract class SearchablePageComponent extends PageComponent
    implements OnDestroy {
    public searchvalue = '';

    searchInput(event) {
        this.searchvalue = event.detail.value;
    }

    cancelSearch() {
        this.searchvalue = '';
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
