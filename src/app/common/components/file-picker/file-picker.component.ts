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

                const folderName = this.technique.title
                    .toLowerCase()
                    .replace(/\s+/g, '_');

                const newFileName =
                    folderName + '_' + shortid() + '.' + filetype;

                const media: MediaModel = {
                    id: 0,
                    file_name: newFileName,
                    file_type: filetype,
                    original_file_name: this.file,
                    folder: folderName,
                    size: '',
                    uploadStatus: 'Uploading',
                    publishedStatus: 'Not Published',
                    views: 0,
                };

                // this.store.dispatch(
                //     new UploadNewMedia({ media: media, file: fileData })
                // );

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

    // onSubmit() {
    //     this.fileUploadProgress = '0%';
    //
    //     // this.app-store.dispatch(new UploadNewVideo({ video, file}));
    //
    //     // // const element = event[0];
    //     this.file = this.fileData.name;
    //     const filetype = this.file.split('.')[1];
    //
    //     this.videoForm.controls['original_file_name'].setValue(
    //         this.fileData.name
    //     );
    //
    //     this.videoForm.controls['file_type'].setValue(filetype);
    //
    //     const folderName = this.techniqueName
    //         .toLowerCase()
    //         .replace(/\s+/g, '_');
    //     const newFileName =
    //         folderName + '_' + 'video' + '_' + new Date().getTime();
    //
    //     const formData = new FormData();
    //     formData.append('files', this.fileData, newFileName);
    //     // // TODO replace 0 with a incremental number
    //     //
    //     this.videoForm.controls['file_name'].setValue(newFileName);
    //
    //     const video: VideoModel = {
    //         id: 0,
    //         file_name: newFileName,
    //         original_file_name: this.fileData.name,
    //         folder: folderName,
    //         file_type: filetype,
    //     };
    //
    //     // this.app-store.dispatch(
    //     //     new UploadNewVideo({ video: video, file: this.fileData })
    //     // );
    //
    //     this.http
    //         .post('http://localhost:8090/media/video/upload', formData, {
    //             reportProgress: true,
    //             observe: 'events',
    //         })
    //         .subscribe(events => {
    //             if (events.type === HttpEventType.UploadProgress) {
    //                 this.fileUploadProgress =
    //                     Math.round((events.loaded / events.total) * 100) + '%';
    //                 console.log(this.fileUploadProgress);
    //             } else if (events.type === HttpEventType.Response) {
    //                 this.fileUploadProgress = '';
    //                 console.log(events.body);
    //                 alert('SUCCESS !!');
    //             }
    //         });
    // }
}
