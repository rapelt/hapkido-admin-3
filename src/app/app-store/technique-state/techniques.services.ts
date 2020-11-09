import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';
import { TechniqueModel } from '../../common/models/technique';
import { TechniqueSetModel } from '../../common/models/technique-set';

@Injectable({
    providedIn: 'root',
})
export class TechniquesServices {
    techniqueUrl = 'http://localhost:8080/technique/';

    constructor(private httpClient: HttpClient) {
        this.techniqueUrl = config['techniqueAPIEndpoint'];
    }

    getAllTechniques() {
        return this.httpClient.get(this.techniqueUrl + 'all');
    }

    getAllTechniquesSets() {
        return this.httpClient.get(this.techniqueUrl + 'set/all');
    }

    addNewTechniqueSet(techniqueSet: string) {
        return this.httpClient.post(this.techniqueUrl + 'set/create', {
            techniqueSet: techniqueSet,
        });
    }

    addNewTechnique(technique: Partial<TechniqueModel>) {
        return this.httpClient.post(this.techniqueUrl + 'create', technique);
    }

    editTechnique(technique: TechniqueModel) {
        return this.httpClient.post(
            this.techniqueUrl + 'update/' + technique.id,
            technique
        );
    }

    editTechniqueSet(techniqueSet: TechniqueSetModel) {
        return this.httpClient.post(
            this.techniqueUrl + 'set/update/' + techniqueSet.id,
            techniqueSet
        );
    }

    deactivateTechniqueSet(id: number) {
        return this.httpClient.post(
            this.techniqueUrl + 'set/deactivate/' + id,
            { id }
        );
    }
}
