import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../../app-store/state/app.reducers';
import { ActivatedRoute } from '@angular/router';
import { getFormData } from './media-form.data';
import { MediaModel } from '../../../common/models/media';
import {
    ActionTypes,
    EditMedia,
} from '../../../app-store/media-state/media.actions';
import { MediaHelperService } from '../../../common/helper/media-helper.service';

@Component({
    selector: 'app-edit-media',
    templateUrl: './edit-media.component.html',
    styleUrls: ['./edit-media.component.scss'],
})
export class EditMediaComponent implements OnInit, OnDestroy {
    subsc;
    activatedRouteSubscriber;
    form: FormGroup;
    sidebarTitleDefault = 'Edit Media';
    sidebarTitle;
    saveAttempted = false;

    formData: {
        original_file_name: any;
        publishedStatus: any;
        tags: any;
    } = getFormData();

    @Output()
    cancel = new EventEmitter<any>();

    _media: MediaModel;
    @Input() set media(val) {
        this._media = val;
        if (this.form) {
            this.mediaId = val.id;
            this.form.setValue({
                original_file_name: val.original_file_name,
                publishedStatus: val.publishedStatus,
                tags: val.tags,
            });
        }
    }

    get media(): MediaModel {
        return this._media;
    }

    @Input()
    mediaId = -1;

    constructor(
        private store: Store<AppState>,
        public activatedRoute: ActivatedRoute,
        private actionsSubject: ActionsSubject,
        private fb: FormBuilder,
        private mediaHelper: MediaHelperService
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            [this.formData.original_file_name.id]: [
                '',
                this.formData.original_file_name.validators,
            ],
            [this.formData.publishedStatus.id]: [
                '',
                this.formData.publishedStatus.validators,
            ],
            [this.formData.tags.id]: [[], this.formData.tags.validators],
        });

        this.subsc = this.actionsSubject.subscribe(data => {
            if (data.type === ActionTypes.Edit_media_success) {
                this.form.reset(this.mediaReset());
            }
        });
    }

    save() {
        this.saveAttempted = true;

        if (this.form.valid && this.mediaId !== -1) {
            const editMedia: Partial<MediaModel> = {
                ...this.form.value,
                id: this.mediaId,
            };
            this.editMedia(editMedia);
        }
    }

    editMedia(newData: Partial<MediaModel>) {
        this.store.dispatch(
            new EditMedia({
                ...this.media,
                ...newData,
            })
        );
    }

    mediaReset(): MediaModel {
        return {
            id: -1,
            file_name: '',
            original_file_name: '',
            uploadStatus: 'Uploaded',
            publishedStatus: 'Draft',
            file_type: '',
            tags: [],
            folder: '',
            views: 0,
            url: '',
        };
    }

    getImageOptions() {
        let url = '';
        if (this.media && this.mediaHelper.isPhoto(this.media.file_type)) {
            url = this.media.url;
        }

        if (this.media && this.mediaHelper.isVideo(this.media.file_type)) {
            url = this.mediaHelper.getVideoThumbnail(this.media);
        }

        return {
            src: url,
            altText: '',
            size: {
                maxWidth: 250,
                maxHeight: 150,
            },
        };
    }

    close() {
        this.saveAttempted = false;
        this.form.reset();
        this.cancel.emit();
        this.media = this.mediaReset();
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
