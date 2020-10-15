import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../../../app-store/state/app.reducers';
import { SetSelectedTechnique } from '../../../../app-store/technique-state/techniques.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from '../../../../common/validators/empty.validator';
import {
    ActionTypes,
    AddNewTag,
} from '../../../../app-store/tags-state/tags.actions';
import { AlertController } from '@ionic/angular';
import { selectLoaded } from '../../edit-technique.selector';
import { filter, takeWhile, withLatestFrom } from 'rxjs/operators';
import {
    selectSelectedTechnique,
    selectTechniquesSets,
} from '../../../../app-store/technique-state/techniques.selectors';
import { selectTags } from '../../../../app-store/tags-state/tags.selectors';
import { PageComponent } from '../../../../common/page.component';
import { TagModel } from '../../../../common/models/tag';
import { UploadNewVideo } from '../../../../app-store/media-state/media.actions';
import { VideoModel } from '../../../../common/models/video';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { SocketioService } from '../../../../common/services/socketio.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
})
export class VideoComponent extends PageComponent implements OnInit {
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private store: Store<AppState>,
        private fb: FormBuilder,
        public alertController: AlertController,
        private actionsSubject: ActionsSubject,
        private http: HttpClient,
        private io: SocketioService
    ) {
        super();
    }

    validation_messages = {
        original_file_name: [
            { type: 'required', message: 'Title is required' },
            {
                type: 'maxlength',
                message: 'Title cannot be more than 200 characters long',
            },
            { type: 'empty', message: 'Title is required' },
        ],
        file_name: [],
        file_type: [],
        description: [],
        tag_group: [],
    };

    file: any = null;
    videoForm: FormGroup;
    tags: TagModel[] = [];
    saveAttempted = false;
    techniqueId: number;
    techniqueName: string;
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    ngOnInit() {
        this.io.getServerUpdates().subscribe(something => {
            console.log(something);
        });

        this.activatedRoute.parent.params.subscribe((params: ParamMap) => {
            this.techniqueId = parseInt(params['techniqueId'], 10);
        });

        this.activatedRoute.params.subscribe((params: ParamMap) => {
            this.initialiseForm();

            this.store
                .select(selectLoaded)
                .pipe(
                    withLatestFrom(
                        this.store.select(
                            selectSelectedTechnique(this.techniqueId)
                        ),
                        this.store.select(selectTags)
                    ),
                    filter(([allLoaded]) => {
                        return this.isAlive && allLoaded;
                    })
                )
                .subscribe(([allLoaded, technique, tags]) => {
                    if (!technique) {
                        return;
                    }
                    this.techniqueName = technique.title;
                    this.tags = tags;
                    const techniqueTags = this.tags.filter(tag =>
                        technique.tags.find(t => t === tag.id)
                    );
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

    compareWithFn = (o1, o2) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
    compareWith = this.compareWithFn;

    initialiseForm() {
        this.videoForm = this.fb.group({
            original_file_name: [
                '',
                [Validators.maxLength(200), emptyValidator()],
            ],
            file_name: ['', [Validators.maxLength(200), emptyValidator()]],
            file_type: ['', [Validators.maxLength(200), emptyValidator()]],
            description: [''],
            tag_group: [],
        });
    }

    next() {
        this.router.navigateByUrl(
            'technique/edit/' + this.techniqueId + '/videos'
        );
    }

    back() {
        this.router.navigateByUrl(
            'technique/edit/' + this.techniqueId + '/videos'
        );
    }

    save() {
        this.next();
    }

    chooseFile(event) {
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.file = element.name;
            const filetype = element.name.split('.')[1];

            this.videoForm.controls['original_file_name'].setValue(
                element.name
            );

            this.videoForm.controls['file_type'].setValue(filetype);

            const folderName = this.techniqueName
                .toLowerCase()
                .replace(/\s+/g, '_');
            const newFileName =
                folderName + '_' + 'video' + '_' + 0 + '.' + filetype;
            // TODO replace 0 with a incremental number

            this.videoForm.controls['file_name'].setValue(newFileName);

            const video: VideoModel = {
                id: 0,
                file_name: newFileName,
                original_file_name: element.name,
                folder: folderName,
                file_type: filetype,
            };

            this.store.dispatch(
                new UploadNewVideo({ video: video, file: this.file })
            );
        }
    }

    uploadFile() {}

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0];
        this.preview();
    }

    preview() {
        // Show preview
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = _event => {
            this.previewUrl = reader.result;
        };
    }

    onSubmit() {
        this.fileUploadProgress = '0%';

        // // this.app-store.dispatch(new UploadNewVideo({ video, file}));
        //
        // // const element = event[0];
        this.file = this.fileData.name;
        const filetype = this.file.split('.')[1];

        this.videoForm.controls['original_file_name'].setValue(
            this.fileData.name
        );
        //
        this.videoForm.controls['file_type'].setValue(filetype);
        //
        const folderName = this.techniqueName
            .toLowerCase()
            .replace(/\s+/g, '_');
        const newFileName =
            folderName + '_' + 'video' + '_' + new Date().getTime();

        const formData = new FormData();
        formData.append('files', this.fileData, newFileName);
        // // TODO replace 0 with a incremental number
        //
        this.videoForm.controls['file_name'].setValue(newFileName);
        //
        // const video: VideoModel = {
        //     id: 0,
        //     file_name: newFileName,
        //     original_file_name: this.fileData.name,
        //     folder: folderName,
        //     file_type: filetype,
        // };
        //
        // this.app-store.dispatch(
        //     new UploadNewVideo({ video: video, file: this.fileData })
        // );

        this.http
            .post('http://localhost:8090/media/video/upload', formData, {
                reportProgress: true,
                observe: 'events',
            })
            .subscribe(events => {
                if (events.type === HttpEventType.UploadProgress) {
                    this.fileUploadProgress =
                        Math.round((events.loaded / events.total) * 100) + '%';
                    console.log(this.fileUploadProgress);
                } else if (events.type === HttpEventType.Response) {
                    this.fileUploadProgress = '';
                    console.log(events.body);
                    alert('SUCCESS !!');
                }
            });
    }

    triggerAddTag() {
        this.newTag();
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
