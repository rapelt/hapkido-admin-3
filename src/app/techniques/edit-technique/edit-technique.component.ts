// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActionsSubject, Store } from '@ngrx/store';
// import { AppState } from '../../app-store/state/app.reducers';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { SetSelectedTechnique } from '../../app-store/technique-state/techniques.actions';
//
// import { selectSelectedTechnique } from '../../app-store/technique-state/techniques.selectors';
// import { PageComponent } from '../../common/page.component';
// import { filter, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
// import { selectLoaded } from './edit-technique.selector';
// import { ProgressBarComponent } from '../../common/components/progress-bar/progress-bar.component';
// import { GeneralComponent } from './segments/general/general.component';
// import { VideosComponent } from './segments/videos/videos.component';
// import { PhotosComponent } from './segments/photos/photos.component';
// import { ReviewComponent } from './segments/review/review.component';
// import { VideoComponent } from './segments/video/video.component';
// import { PhotoComponent } from './segments/photo/photo.component';
// import { Observable, combineLatest } from 'rxjs';
//
// @Component({
//     selector: 'app-edit-technique',
//     templateUrl: './edit-technique.component.html',
//     styleUrls: ['./edit-technique.component.scss'],
// })
// export class EditTechniqueComponent extends PageComponent implements OnInit {
//     technique;
//     techniqueId: number;
//
//     // @ts-ignore
//     @ViewChild(ProgressBarComponent) progressBar!: ProgressBarComponent;
//
//     constructor(
//         private store: Store<AppState>,
//         public activatedRoute: ActivatedRoute
//     ) {
//         super();
//     }
//
//     ngOnInit() {
//         this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
//             this.techniqueId = parseInt(params.get('techniqueId'), 10);
//             this.store.dispatch(new SetSelectedTechnique(5));
//
//             const techniqueOb = combineLatest([
//                 this.store.select(selectLoaded),
//                 this.store.select(selectSelectedTechnique(this.techniqueId)),
//             ]).pipe(
//                 filter(([allLoaded]) => {
//                     return this.isAlive && allLoaded;
//                 })
//             );
//
//             techniqueOb.subscribe(([loaded, technique]) => {
//                 this.technique = technique;
//             });
//         });
//     }
//
//     cancel() {}
//
//     steps = [
//         {
//             step: 1,
//             type: [GeneralComponent],
//             description: 'Step 1',
//             element: null,
//         },
//         {
//             step: 2,
//             type: [VideoComponent, VideosComponent],
//             description: 'Step 2',
//             element: null,
//         },
//         {
//             step: 3,
//             type: [PhotoComponent, PhotosComponent],
//             description: 'Step 3',
//             element: null,
//         },
//         {
//             step: 4,
//             type: [ReviewComponent],
//             description: 'Review',
//             element: null,
//         },
//     ];
//
//     onActivate(componentReference) {
//         this.progressBar.next(componentReference);
//     }
// }
//
// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { ActionsSubject, Store } from '@ngrx/app-store';
// // import { AppState } from '../../technique-tags-student-media-classes-auth-state/app.reducers';
// // import { MessagesService } from '../../messages/messages.service';
// // import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// // import { AlertController, NavController } from '@ionic/angular';
// // import { emptyValidator } from '../../common/validators/empty.validator';
// // import { GradeModel } from '../../common/helper/grade/grade.model';
// // import { GradeHelper } from '../../common/helper/grade/grade';
// // import { TechniqueSetFilterService } from '../../common/helper/technique-set-filter.service';
// // // tslint:disable-next-line:no-var-requires
// // require('aws-sdk/dist/aws-sdk');
// // import {
// //     AddNewTechniqueSet,
// //     EditTechnique,
// //     SetSelectedTechnique,
// // } from '../technique-tags-student-media-classes-auth-state/techniques.actions';
// // import { ActionTypes, AddNewTag } from '../../tags/technique-tags-student-media-classes-auth-state/tags.actions';
// // import { TechniqueModel } from '../../common/models/technique';
// // import { TagModel } from '../../common/models/tag';
// // import {
// //     selectSelectedTechnique,
// //     selectTechniqueLoaded,
// //     selectTechniqueSetsLoaded,
// //     selectTechniquesSets,
// // } from '../technique-tags-student-media-classes-auth-state/techniques.selectors';
// // import { PageComponent } from '../../common/page.component';
// // import { filter, takeWhile, withLatestFrom } from 'rxjs/operators';
// // import { selectTagLoaded, selectTags } from '../../tags/technique-tags-student-media-classes-auth-state/tags.selectors';
// // import { switchMap } from 'rxjs-compat/operator/switchMap';
// // import { TechniqueSetModel } from '../../common/models/technique-set';
// // import { selectLoaded } from './edit-technique.selector';
// // import { config, environment } from '../../../environments/environment';
// // import { AddNewVideo } from '../../media/technique-tags-student-media-classes-auth-state/media.actions';
// // import { VideoModel } from '../../common/models/video';
// //
// // @Component({
// //     selector: 'app-edit-technique',
// //     templateUrl: './edit-technique.component.html',
// //     styleUrls: ['./edit-technique.component.scss'],
// // })
// // export class EditTechniqueComponent extends PageComponent implements OnInit {
// //     constructor(
// //         private fb: FormBuilder,
// //         private app-store: Store<AppState>,
// //         private messages: MessagesService,
// //         public router: Router,
// //         public activatedRoute: ActivatedRoute,
// //         public navController: NavController,
// //         private actionsSubject: ActionsSubject,
// //         private gradeHelper: GradeHelper,
// //         public alertController: AlertController,
// //         public techniqueSetFilterService: TechniqueSetFilterService
// //     ) {
// //         super();
// //     }
// //     techniqueSet: TechniqueSetModel;
// //     techniqueId: number;
// //
// //     validation_messages = {
// //         title: [
// //             { type: 'required', message: 'Title is required' },
// //             {
// //                 type: 'maxlength',
// //                 message: 'Title cannot be more than 200 characters long',
// //             },
// //             { type: 'empty', message: 'Title is required' },
// //         ],
// //         description: [],
// //         grade: [],
// //         technique_group_name: [],
// //         tag_group: [],
// //     };
// //
// //     editTechniqueForm: FormGroup;
// //     grades: GradeModel[] = [];
// //     saveAttempted = false;
// //     tags: TagModel[] = [];
// //
// //     compareWithFn = (o1, o2) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
// //     compareWith = this.compareWithFn;
// //
// //     ngOnInit() {
// //         this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
// //             this.techniqueId = parseInt(params.get('techniqueId'), 10);
// //             this.app-store.dispatch(new SetSelectedTechnique(5));
// //             this.grades = this.gradeHelper.getAllGrades();
// //             this.initialiseForm();
// //
// //             this.app-store
// //                 .select(selectLoaded)
// //                 .pipe(
// //                     withLatestFrom(
// //                         this.app-store.select(selectTechniquesSets),
// //                         this.app-store.select(
// //                             selectSelectedTechnique(this.techniqueId)
// //                         ),
// //                         this.app-store.select(selectTags)
// //                     ),
// //                     filter(([allLoaded]) => {
// //                         console.log(allLoaded);
// //                         return this.isAlive && allLoaded;
// //                     })
// //                 )
// //                 .subscribe(([allLoaded, techniqueSets, technique, tags]) => {
// //                     this.tags = tags;
// //                     const techniqueTags = this.tags.filter(tag =>
// //                         technique.tags.find(t => t === tag.id)
// //                     );
// //                     this.techniqueSet = techniqueSets.find(
// //                         t => t.id === technique.techniqueSet
// //                     );
// //                     this.editTechniqueForm.setValue({
// //                         ...this.editTechniqueForm.value,
// //                         title: technique.title,
// //                         description: technique.description,
// //                         grade: technique.grade,
// //                         technique_group_name: this.techniqueSet.name,
// //                         tag_group: techniqueTags,
// //                     });
// //                 });
// //         });
// //
// //         this.actionsSubject
// //             .pipe(
// //                 takeWhile(() => this.isAlive),
// //                 filter(data => data.type === ActionTypes.Add_new_tag_success),
// //                 withLatestFrom(this.app-store.select(selectTags))
// //             )
// //             .subscribe(([action, tags]) => {
// //                 this.tags = tags;
// //             });
// //     }
// //
// //     initialiseForm() {
// //         this.editTechniqueForm = this.fb.group({
// //             title: ['', [Validators.maxLength(200), emptyValidator()]],
// //             description: [''],
// //             grade: [0],
// //             technique_group_name: [],
// //             tag_group: [],
// //         });
// //     }
// //
// //     techniqueSetChanged(techniqueSet) {
// //         console.log(techniqueSet);
// //         this.techniqueSet = techniqueSet;
// //     }
// //
// //     cancel() {
// //         this.navController.navigateBack('technique/list');
// //     }
// //
// //     save() {
// //         if (this.editTechniqueForm.invalid) {
// //             this.messages.updateError(
// //                 'Form is invalid, please update and try again'
// //             );
// //         } else {
// //             const techniqueFormValues = this.editTechniqueForm.value;
// //             const technique: TechniqueModel = {
// //                 id: this.techniqueId,
// //                 title: techniqueFormValues.title,
// //                 grade: techniqueFormValues.grade,
// //                 description: techniqueFormValues.description,
// //                 techniqueSet: this.techniqueSet.id,
// //                 videos: [],
// //                 photos: [],
// //                 tags: techniqueFormValues.tag_group.map(tag => tag.id),
// //             };
// //
// //             this.app-store.dispatch(new EditTechnique(technique));
// //         }
// //     }
// //
// //     videoSelected(event) {
// //         const file = event.target.files[0];
// //         const techniqueFormValues = this.editTechniqueForm.value;
// //         const type = file.name.split('.')[1].toLowerCase();
// //
// //         const video: VideoModel = {
// //             id: 0,
// //             file_name:
// //                 techniqueFormValues.title.replace(/\s/g, '-') + '.' + type,
// //             file_type: type,
// //             original_file_name: file.name,
// //             tags: [],
// //             folder: this.techniqueSet.name.replace(/\s/g, '-'),
// //         };
// //
// //         this.app-store.dispatch(new AddNewVideo({ video, file }));
// //     }
// //
// //     triggerAddTag() {
// //         this.newTag();
// //     }
// //
// //     triggerAddTechniqueSet() {
// //         this.newTechniqueSet();
// //     }
// //
// //     async newTechniqueSet() {
// //         const alert = await this.alertController.create({
// //             header: 'New technique set',
// //             inputs: [
// //                 {
// //                     name: 'name',
// //                     type: 'text',
// //                     placeholder: 'Technique set',
// //                 },
// //             ],
// //             buttons: [
// //                 {
// //                     text: 'Cancel',
// //                     role: 'cancel',
// //                     cssClass: 'secondary',
// //                     handler: () => {
// //                         console.log('Confirm Cancel');
// //                     },
// //                 },
// //                 {
// //                     text: 'Ok',
// //                     handler: techniqueSet => {
// //                         this.addTechniqueSet(techniqueSet);
// //                     },
// //                 },
// //             ],
// //         });
// //
// //         await alert.present();
// //     }
// //
// //     async newTag() {
// //         const alert = await this.alertController.create({
// //             header: 'New tag',
// //             inputs: [
// //                 {
// //                     name: 'name',
// //                     type: 'text',
// //                     placeholder: 'Tag',
// //                 },
// //             ],
// //             buttons: [
// //                 {
// //                     text: 'Cancel',
// //                     role: 'cancel',
// //                     cssClass: 'secondary',
// //                     handler: () => {
// //                         console.log('Confirm Cancel');
// //                     },
// //                 },
// //                 {
// //                     text: 'Ok',
// //                     handler: tag => {
// //                         this.addTag(tag);
// //                     },
// //                 },
// //             ],
// //         });
// //
// //         await alert.present();
// //     }
// //
// //     addTechniqueSet(techniqueSetName) {
// //         this.app-store.dispatch(new AddNewTechniqueSet(techniqueSetName));
// //     }
// //
// //     addTag(tagName) {
// //         this.app-store.dispatch(new AddNewTag(tagName));
// //     }
// // }
// //
// // // const techniqueFormValues = this.editTechniqueForm.value;
// // //
// // // const AWSService = (window as any).AWS;
// // // console.log(AWSService);
// // // const file = video.target.files[0];
// // // console.log(file);
// // //
// // // const params = {
// // //     Key:
// // //         'inputs/' +
// // //         techniqueFormValues.title.replace(/\s/g, '-') +
// // //         '.' +
// // //         file.name.split('.')[1],
// // //     Body: file,
// // // };
// // //
// // // bucket.upload(params, (err, res) => {
// // //     console.log('error', err);
// // //     console.log('response', res);
// // // });
// //
// //
// //
// //
// //
// //
// //
