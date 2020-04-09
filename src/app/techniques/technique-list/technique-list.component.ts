import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AddNewTechnique, GetAllTechniques } from '../state/techniques.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.reducers';
import { getClassState } from '../../classes/state/classes.selectors';
import { takeWhile } from 'rxjs/operators';
import { getTechniquesState } from '../state/techniques.selectors';
import { PageComponent } from '../../common/page.component';

@Component({
    selector: 'app-technique-list',
    templateUrl: './technique-list.component.html',
    styleUrls: ['./technique-list.component.scss'],
})
export class TechniqueListComponent extends PageComponent implements OnInit {
    loaded = true;

    constructor(
        public alertController: AlertController,
        private store: Store<AppState>
    ) {
        super();
    }

    ngOnInit() {
        this.store.dispatch(new GetAllTechniques());

        this.store
            .select(getTechniquesState)
            .pipe(takeWhile(() => this.isAlive))
            .subscribe(techniqueState => {
                console.log(techniqueState);
            });
    }

    addTechnique(techniqueName) {
        console.log(techniqueName.name);
        this.store.dispatch(new AddNewTechnique(techniqueName));
    }

    async newTechnique() {
        const alert = await this.alertController.create({
            header: 'New technique',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Technique name',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    },
                },
                {
                    text: 'Ok',
                    handler: techniqueName => {
                        this.addTechnique(techniqueName);
                    },
                },
            ],
        });

        await alert.present();
    }
}
