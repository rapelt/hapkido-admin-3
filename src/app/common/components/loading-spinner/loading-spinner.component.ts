import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingSpinnerService } from './loading-spinner.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
    loading;

    constructor(
        public loadingController: LoadingController,
        private loadingService: LoadingSpinnerService
    ) {}

    ngOnInit(): void {
        this.presentLoading();
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Please wait...',
        });
        await this.loading.present();

        this.loadingService.loadingSpinner.subscribe(isLoading => {
            if (isLoading) {
                this.loading.present();
            } else {
                this.loading.dismiss();
            }
        });

        const { role, data } = await this.loading.onDidDismiss();
        console.log('Loading dismissed!');
    }

    async presentLoadingWithOptions() {
        const loading = await this.loadingController.create({
            spinner: null,
            duration: 5000,
            message: 'Click the backdrop to dismiss early...',
            translucent: true,
            cssClass: 'custom-class custom-loading',
            backdropDismiss: true,
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed with role:', role);
    }
}
