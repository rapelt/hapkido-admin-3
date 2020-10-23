import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    OnInit,
} from '@angular/core';
import { FormElementDirective } from '../form-element.directive';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TagsFormModel } from './tags-form.model';
import { TagModel } from '../../models/tag';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../../../app-store/state/app.reducers';
import { filter, map, takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
    selectTagLoaded,
    selectTags,
} from '../../../app-store/tags-state/tags.selectors';
import { AlertController } from '@ionic/angular';
import {
    ActionTypes,
    AddNewTag,
    AddNewTagSuccess,
} from '../../../app-store/tags-state/tags.actions';
import { isObject } from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TagsComponent),
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TagsComponent),
            multi: true,
        },
    ],
})
export class TagsComponent extends FormElementDirective implements OnInit {
    @Input()
    formData: TagsFormModel;

    loaded = false;

    tags: Observable<TagModel[]>;

    subsc;

    constructor(
        private store: Store<AppState>,
        public alertController: AlertController,
        private actionsSubject: ActionsSubject,
        private ref: ChangeDetectorRef
    ) {
        super();
    }

    compareWithFn = (o1: number, o2) => {
        if (o1 && o2) {
            if (o1 && isObject(o2) && !Array.isArray(o2)) {
                return o1 === o2.id;
            }

            if (o1 && Array.isArray(o2)) {
                return o2.find(e => e === o1);
            }
            if (o1 && typeof o2 === 'number') {
                return o1 === o2;
            }

            return false;
        }

        return false;
    }
    compareWith = this.compareWithFn;

    ngOnInit() {
        // this.tags = this.store.getAllGrades();
        this.tags = this.store.pipe(
            filter(() => this.loaded),
            select(selectTags)
        );

        this.store.pipe(map(selectTagLoaded)).subscribe(allValuesLoaded => {
            this.loaded = allValuesLoaded;
        });
        this.formElement = new FormControl('', this.formData.validators);

        this.subsc = this.actionsSubject.subscribe((data: AddNewTagSuccess) => {
            if (data.type === ActionTypes.Add_new_tag_success) {
                this.writeValue([...this.formElement.value, data.payload]);
                this.ref.detectChanges();
            }
        });
    }

    triggerAddTag() {
        this.newTag();
    }

    writeValue(obj: any): void {
        obj ? this.formElement.setValue(obj) : this.formElement.setValue('');
    }

    doInput() {
        this.onChange(this.formElement.value);
    }

    async newTag() {
        const alert = await this.alertController.create({
            header: 'New tag',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Tag',
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
                    handler: tag => {
                        this.addTag(tag);
                    },
                },
            ],
        });

        await alert.present();
    }

    addTag(tagName) {
        this.store.dispatch(new AddNewTag(tagName));
    }
}
