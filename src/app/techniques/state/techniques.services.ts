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
        console.log('Techniques Service - Get all techniques');

        return this.httpClient.get(this.techniqueUrl + 'all');
    }

    getAllTechniquesSets() {
        console.log('Techniques Service - Get all techniques sets');

        return this.httpClient.get(this.techniqueUrl + 'set/all');
    }

    addNewTechniqueSet(techniqueSet: string) {
        console.log('Add New Technique set with name ' + techniqueSet);
        return this.httpClient.post(
            this.techniqueUrl + 'set/create',
            techniqueSet
        );
    }

    addNewTechnique(technique: string) {
        console.log('Add New Technique with name ' + technique);
        return this.httpClient.post(this.techniqueUrl + 'create', technique);
    }

    editTechnique(technique: TechniqueModel) {
        return this.httpClient.post(
            this.techniqueUrl + 'update/' + technique.id,
            technique
        );
    }
}
