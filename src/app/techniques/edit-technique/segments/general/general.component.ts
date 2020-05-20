import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.reducers';
import { MessagesService } from '../../../../messages/messages.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { GradeHelper } from '../../../../common/helper/grade/grade';
import { TechniqueSetFilterService } from '../../../../common/helper/technique-set-filter.service';
import { TechniqueSetModel } from '../../../../common/models/technique-set';
import { GradeModel } from '../../../../common/helper/grade/grade.model';
import { TagModel } from '../../../../common/models/tag';
import {
    AddNewTechniqueSet,
    EditTechnique,
    SetSelectedTechnique,
} from '../../../state/techniques.actions';
import { selectLoaded } from '../../edit-technique.selector';
import { filter, takeWhile, withLatestFrom } from 'rxjs/operators';
import {
    selectSelectedTechnique,
    selectTechniquesSets,
} from '../../../state/techniques.selectors';
import { selectTags } from '../../../../tags/state/tags.selectors';
import { ActionTypes, AddNewTag } from '../../../../tags/state/tags.actions';
import { emptyValidator } from '../../../../common/validators/empty.validator';
import { TechniqueModel } from '../../../../common/models/technique';
import { VideoModel } from '../../../../common/models/video';
import { AddNewVideo } from '../../../../media/state/media.actions';
import { PageComponent } from '../../../../common/page.component';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss'],
})
export class GeneralComponent extends PageComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private messages: MessagesService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public navController: NavController,
        private actionsSubject: ActionsSubject,
        private gradeHelper: GradeHelper,
        public alertController: AlertController,
        public techniqueSetFilterService: TechniqueSetFilterService
    ) {
        super();
    }
    techniqueSet: TechniqueSetModel;
    techniqueId: number;

    validation_messages = {
        title: [
            { type: 'required', message: 'Title is required' },
            {
                type: 'maxlength',
                message: 'Title cannot be more than 200 characters long',
            },
            { type: 'empty', message: 'Title is required' },
        ],
        description: [],
        grade: [],
        technique_group_name: [],
        tag_group: [],
    };

    editTechniqueForm: FormGroup;
    grades: GradeModel[] = [];
    saveAttempted = false;
    tags: TagModel[] = [];

    compareWithFn = (o1, o2) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
    compareWith = this.compareWithFn;

    ngOnInit() {
        this.activatedRoute.parent.params.subscribe((params: ParamMap) => {
            this.techniqueId = parseInt(params['techniqueId'], 10);
            this.store.dispatch(new SetSelectedTechnique(5));
            this.grades = this.gradeHelper.getAllGrades();
            this.initialiseForm();

            this.store
                .select(selectLoaded)
                .pipe(
                    withLatestFrom(
                        this.store.select(selectTechniquesSets),
                        this.store.select(
                            selectSelectedTechnique(this.techniqueId)
                        ),
                        this.store.select(selectTags)
                    ),
                    filter(([allLoaded]) => {
                        return this.isAlive && allLoaded;
                    })
                )
                .subscribe(([allLoaded, techniqueSets, technique, tags]) => {
                    if (!technique) {
                        return;
                    }
                    this.tags = tags;
                    const techniqueTags = this.tags.filter(tag =>
                        technique.tags.find(t => t === tag.id)
                    );
                    this.techniqueSet = techniqueSets.find(
                        t => t.id === technique.techniqueSet
                    );
                    this.editTechniqueForm.setValue({
                        ...this.editTechniqueForm.value,
                        title: technique.title,
                        description: technique.description,
                        grade: technique.grade,
                        technique_group_name: this.techniqueSet.name,
                        tag_group: techniqueTags,
                    });
                });
        });

        this.actionsSubject
            .pipe(
                takeWhile(() => this.isAlive),
                filter(data => data.type === ActionTypes.Add_new_tag_success),
                withLatestFrom(this.store.select(selectTags))
            )
            .subscribe(([action, tags]) => {
                this.tags = tags;
            });
    }

    initialiseForm() {
        this.editTechniqueForm = this.fb.group({
            title: ['', [Validators.maxLength(200), emptyValidator()]],
            description: [''],
            grade: [0],
            technique_group_name: [],
            tag_group: [],
        });
    }

    techniqueSetChanged(techniqueSet) {
        console.log(techniqueSet);
        this.techniqueSet = techniqueSet;
    }

    next() {
        if (this.editTechniqueForm.invalid) {
            this.messages.updateError(
                'Form is invalid, please update and try again'
            );
        } else {
            this.save();
            this.router.navigateByUrl(
                'technique/edit/' + this.techniqueId + '/videos'
            );
        }
    }

    cancel() {
        this.navController.navigateBack('technique/list');
    }

    save() {
        const techniqueFormValues = this.editTechniqueForm.value;
        const technique: TechniqueModel = {
            id: this.techniqueId,
            title: techniqueFormValues.title,
            grade: techniqueFormValues.grade,
            description: techniqueFormValues.description,
            techniqueSet: this.techniqueSet.id,
            videos: [],
            photos: [],
            tags: techniqueFormValues.tag_group.map(tag => tag.id),
        };

        this.store.dispatch(new EditTechnique(technique));
    }

    triggerAddTag() {
        this.newTag();
    }

    triggerAddTechniqueSet() {
        this.newTechniqueSet();
    }

    async newTechniqueSet() {
        const alert = await this.alertController.create({
            header: 'New technique set',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Technique set',
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
                    handler: techniqueSet => {
                        this.addTechniqueSet(techniqueSet);
                    },
                },
            ],
        });

        await alert.present();
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

    addTechniqueSet(techniqueSetName) {
        this.store.dispatch(new AddNewTechniqueSet(techniqueSetName));
    }

    addTag(tagName) {
        this.store.dispatch(new AddNewTag(tagName));
    }
}
