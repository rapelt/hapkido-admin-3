import { Component, Input, OnInit } from '@angular/core';
import { MediaModel } from '../../models/media';
import { TechniqueModel } from '../../models/technique';
import { shortid } from 'ionic/lib/utils/uuid';
import { AppState } from '../../../app-store/state/app.reducers';
import { Store } from '@ngrx/store';
import { UploadNewMedia } from '../../../app-store/media-state/media.actions';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-file-picker',
    templateUrl: './file-picker.component.html',
    styleUrls: ['./file-picker.component.scss'],
})
export class FilePickerComponent implements OnInit {
    // fileData: File = null;
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

                const newFileName =
                    folderName + this.technique.id + '_' + shortid();

                const formData = new FormData();
                formData.append('files', fileData, newFileName);

                this.http
                    .post('http://localhost:8090/media/upload', formData, {
                        reportProgress: true,
                        observe: 'events',
                    })
                    .subscribe(events => {
                        if (events.type === HttpEventType.UploadProgress) {
                            this.fileUploadProgress =
                                Math.round(
                                    (events.loaded / events.total) * 100
                                ) + '%';
                            console.log(this.fileUploadProgress);
                        } else if (events.type === HttpEventType.Response) {
                            this.fileUploadProgress = '';
                            console.log(events.body);
                        }
                    });
            }
        }
    }
}
