import { Component, Input, OnInit } from '@angular/core';
import { TechniqueModel } from '../../../common/models/technique';
import { shortid } from 'ionic/lib/utils/uuid';
import { AppState } from '../../../app-store/state/app.reducers';
import { Store } from '@ngrx/store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MediaModel } from '../../../common/models/media';
import { UploadNewMedia } from '../../../app-store/media-state/media.actions';

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

    constructor(public store: Store<AppState>, private http: HttpClient) {}

    ngOnInit() {}

    // fileProgress(fileInput: any) {
    //     this.fileData = fileInput.target.files[0];
    //     this.preview();
    // }

    // preview() {
    //     // Show preview
    //     const mimeType = this.fileData.type;
    //     if (mimeType.match(/image\/*/) == null) {
    //         return;
    //     }
    //
    //     const reader = new FileReader();
    //     reader.readAsDataURL(this.fileData);
    //     reader.onload = _event => {
    //         this.previewUrl = reader.result;
    //     };
    // }

    chooseFile(event: FileList) {
        const files = event;

        for (const file in files) {
            if (Number.isInteger(Number(file))) {
                const fileData: File = files[file];
                this.file = fileData.name;
                const fileTypeSplitter = fileData.name.split('.');
                const filetype = fileTypeSplitter[fileTypeSplitter.length - 1];

                const folderName = `${this.technique.techniqueSet.id}#${this.technique.id}#`
                    .toLowerCase()
                    .replace(/\s+/g, '_');

                const newFileName = this.technique.id + '_' + shortid();

                const filenameWithFolder = folderName + newFileName;

                const formData = new FormData();
                formData.append('files', fileData, filenameWithFolder);

                const media: Partial<MediaModel> = {
                    file_name: newFileName,
                    file_type: filetype,
                    original_file_name: fileData.name,
                    folder: folderName,
                };

                this.store.dispatch(
                    new UploadNewMedia({ fileData: formData, media: media })
                );
            }
        }
    }
}
