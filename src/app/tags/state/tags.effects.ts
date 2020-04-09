import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../messages/messages.service';
import { TagsServices } from './tags.services';
import { ActionTypes, AddNewTag, EditTag } from './tags.actions';
import { TagModel } from '../../common/models/tag';

@Injectable()
export class TagsEffects {
    @Effect()
    getAllTags = this.actions.pipe(
        ofType(ActionTypes.Get_all_tags),
        mergeMap(() =>
            this.tagsService.getAllTags().pipe(
                map((tags: TagModel[]) => ({
                    type: ActionTypes.Get_all_tags_success,
                    payload: tags,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    addNewTag = this.actions.pipe(
        ofType(ActionTypes.Add_new_tag),
        mergeMap((action: AddNewTag) =>
            this.tagsService.addNewTag(action.payload).pipe(
                map((tag: string) => ({
                    type: ActionTypes.Add_new_tag_success,
                    payload: tag,
                })),
                tap((response: any) => {
                    this.messageService.updateSuccess.next('New tag created');
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editTag = this.actions.pipe(
        ofType(ActionTypes.Edit_tag),
        mergeMap((action: EditTag) =>
            this.tagsService.editTag(action.payload).pipe(
                map((tag: TagModel[]) => ({
                    type: ActionTypes.Edit_tag_success,
                    payload: tag,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next();
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    handleError(message) {
        console.log(message);
        this.messageService.updateError.next(message);
    }

    constructor(
        private actions: Actions,
        private router: Router,
        private tagsService: TagsServices,
        private messageService: MessagesService
    ) {}
}
