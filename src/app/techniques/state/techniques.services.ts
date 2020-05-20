import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';
import { TechniqueModel } from '../../common/models/technique';

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
        return this.httpClient.post(
            this.techniqueUrl + 'set/create',
            techniqueSet
        );
    }

    addNewTechnique(technique: string) {
        return this.httpClient.post(this.techniqueUrl + 'create', technique);
    }

    editTechnique(technique: TechniqueModel) {
        return this.httpClient.post(
            this.techniqueUrl + 'update/' + technique.id,
            technique
        );
    }
}
