// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { AppState } from '../../../../app-store/state/app.reducers';
// import { SetSelectedTechnique } from '../../../../app-store/technique-state/techniques.actions';
//
// @Component({
//     selector: 'app-photo',
//     templateUrl: './photo.component.html',
//     styleUrls: ['./photo.component.scss'],
// })
// export class PhotoComponent implements OnInit {
//     constructor(
//         public router: Router,
//         public activatedRoute: ActivatedRoute,
//         private store: Store<AppState>
//     ) {}
//
//     techniqueId: number;
//
//     ngOnInit() {
//         this.activatedRoute.parent.params.subscribe((params: ParamMap) => {
//             this.techniqueId = parseInt(params['techniqueId'], 10);
//             this.store.dispatch(new SetSelectedTechnique(5));
//         });
//     }
//
//     next() {
//         this.router.navigateByUrl(
//             'technique/edit/' + this.techniqueId + '/photos'
//         );
//     }
//
//     back() {
//         this.router.navigateByUrl(
//             'technique/edit/' + this.techniqueId + '/general'
//         );
//     }
//
//     save() {
//         this.next();
//     }
// }
