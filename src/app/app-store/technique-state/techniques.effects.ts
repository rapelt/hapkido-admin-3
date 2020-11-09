import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../common/messages/messages.service';
import { TechniquesServices } from './techniques.services';
import {
    ActionTypes,
    AddNewTechnique,
    AddNewTechniqueSet,
    DeactivateTechniqueSet,
    EditTechnique,
    EditTechniqueSet,
} from './techniques.actions';
import { TechniqueModel } from '../../common/models/technique';
import { TechniqueSetModel } from '../../common/models/technique-set';

@Injectable()
export class TechniquesEffects {
    @Effect()
    getAllTechniques = this.actions.pipe(
        ofType(ActionTypes.Get_all_techniques),
        mergeMap(() =>
            this.techniquesService.getAllTechniques().pipe(
                map((techniques: TechniqueModel[]) => ({
                    type: ActionTypes.Get_all_techniques_success,
                    payload: techniques,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    getAllTechniquesSets = this.actions.pipe(
        ofType(ActionTypes.Get_all_techniques_sets),
        mergeMap(() =>
            this.techniquesService.getAllTechniquesSets().pipe(
                map((techniqueSets: TechniqueSetModel[]) => ({
                    type: ActionTypes.Get_all_techniques_sets_success,
                    payload: techniqueSets,
                })),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    addNewTechnique = this.actions.pipe(
        ofType(ActionTypes.Add_new_technique),
        mergeMap((action: AddNewTechnique) =>
            this.techniquesService.addNewTechnique(action.payload).pipe(
                map((technique: Partial<TechniqueModel>) => ({
                    type: ActionTypes.Add_new_technique_success,
                    payload: technique,
                })),
                tap((response: any) => {
                    this.messageService.updateSuccess.next(
                        'New technique created'
                    );
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    addNewTechniqueSet = this.actions.pipe(
        ofType(ActionTypes.Add_new_technique_set),
        mergeMap((action: AddNewTechniqueSet) =>
            this.techniquesService.addNewTechniqueSet(action.payload).pipe(
                map((techniqueSet: string) => ({
                    type: ActionTypes.Add_new_technique_set_success,
                    payload: techniqueSet,
                })),
                tap((response: any) => {
                    this.messageService.updateSuccess.next(
                        'New technique set added'
                    );
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editTechnique = this.actions.pipe(
        ofType(ActionTypes.Edit_technique),
        mergeMap((action: EditTechnique) =>
            this.techniquesService.editTechnique(action.payload).pipe(
                map((technique: TechniqueModel[]) => ({
                    type: ActionTypes.Edit_technique_success,
                    payload: action.payload,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next('Technique Updated');
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editTechniqueSet = this.actions.pipe(
        ofType(ActionTypes.Edit_technique_set),
        mergeMap((action: EditTechniqueSet) =>
            this.techniquesService.editTechniqueSet(action.payload).pipe(
                map((techniqueSet: TechniqueSetModel) => ({
                    type: ActionTypes.Edit_technique_set_success,
                    payload: action.payload,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next('Technique Updated');
                }),
                catchError(error => {
                    this.handleError(error.message);
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    deactivateTechniqueSet = this.actions.pipe(
        ofType(ActionTypes.Deactivate_technique_set),
        mergeMap((action: DeactivateTechniqueSet) =>
            this.techniquesService.deactivateTechniqueSet(action.payload).pipe(
                map((techniqueSet: TechniqueSetModel) => ({
                    type: ActionTypes.Deactivate_technique_set_success,
                    payload: action.payload,
                })),
                tap(() => {
                    // this.messageService.updateSuccess.next('Technique Updated');
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
        private techniquesService: TechniquesServices,
        private messageService: MessagesService
    ) {}
}
