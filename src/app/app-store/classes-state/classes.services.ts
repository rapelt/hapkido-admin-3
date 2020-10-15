import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import { ClassModel } from '../../common/models/class';

@Injectable({
    providedIn: 'root',
})
export class ClassesServices {
    classUrl = 'http://localhost:8080/class/';

    constructor(private httpClient: HttpClient) {
        this.classUrl = config['classAPIEndpoint'];
    }

    getAllClasses() {
        return this.httpClient.get(this.classUrl + 'all');
    }

    addClasses(classes: ClassModel[]) {
        return this.httpClient.post(this.classUrl + 'create', { classes });
    }

    deleteClass(classId: string) {
        return this.httpClient.post(this.classUrl + 'delete/' + classId, null);
    }

    addStudentToClass(classId: string, studentId: string) {
        return this.httpClient.post(this.classUrl + 'addtoclass/' + classId, {
            studentId: studentId,
        });
    }

    makeClassAGrading(classId: string) {
        return this.httpClient.post(
            this.classUrl + 'makeclassagrading/' + classId,
            {}
        );
    }

    removeStudentFromClass(classId: string, studentId: string) {
        return this.httpClient.post(
            this.classUrl + 'removefromclass/' + classId,
            { studentId: studentId }
        );
    }
}
