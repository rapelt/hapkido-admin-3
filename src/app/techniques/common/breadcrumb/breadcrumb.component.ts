import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
    @Input()
    breadcrumbs: {
        name: string;
        navigate: string;
    }[];

    constructor(public router: Router) {}

    ngOnInit() {}

    navigate(breadcrumb) {
        console.log(breadcrumb);
        this.router.navigate([breadcrumb.navigate]);
    }
}
