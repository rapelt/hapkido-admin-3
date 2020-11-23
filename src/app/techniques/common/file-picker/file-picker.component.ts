import { Component, Input, OnInit } from '@angular/core';
import { TechniqueModel } from '../../../common/models/technique';
import { shortid } from 'ionic/lib/utils/uuid';
import { AppState } from '../../../app-store/state/app.reducers';
import { Store } from '@ngrx/store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MediaModel } from '../../../common/models/media';
import { UploadNewMedia } from '../../../app-store/media-state/media.actions';
import { MediaHelperService } from '../../../common/helper/media-helper.service';
import { Media } from 'aws-sdk/clients/transcribeservice';
import { MessagesService } from '../../../common/messages/messages.service';

@Component({
    selector: 'app-file-picker',
    templateUrl: './file-picker.component.html',
    styleUrls: ['./file-picker.component.scss'],
})
export class FilePickerComponent implements OnInit {
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    file: any = null;

    @Input()
    technique: TechniqueModel;

    constructor(
        public store: Store<AppState>,
        public mediaHelper: MediaHelperService,
        public message: MessagesService
    ) {}

    ngOnInit() {}

    chooseFile(event: FileList) {
        const files = event;

        for (const file in files) {
            if (Number.isInteger(Number(file))) {
                const fileData: File = files[file];
                this.file = fileData.name;
                const fileTypeSplitter = fileData.name.split('.');
                const filetype = fileTypeSplitter[fileTypeSplitter.length - 1];

                if (this.mediaHelper.whatType(filetype) === 'none') {
                    this.message.updateInfo.next(
                        'The file type ' +
                            filetype +
                            ' is not allowed. If you really want this to work you will need to talk to Rebekah.'
                    );
                    continue;
                }

                const folderName = `${this.technique.techniqueSet.id}/${
                    this.technique.id
                }/${this.mediaHelper.whatType(filetype)}`
                    .toLowerCase()
                    .replace(/\s+/g, '_');

                const newFileName = this.technique.id + '_' + shortid();

                const media: Partial<MediaModel> = {
                    file_name: newFileName,
                    file_type: filetype,
                    original_file_name: fileData.name,
                    folder: folderName,
                    size: fileData.size + '',
                    publishedStatus: 'Draft',
                    views: 0,
                    uploadStatus: 'Processing',
                    url: this.mediaHelper.getURL(
                        filetype,
                        newFileName,
                        folderName
                    ),
                };

                this.store.dispatch(
                    new UploadNewMedia({ fileData: fileData, media: media })
                );
            }
        }
    }
}
