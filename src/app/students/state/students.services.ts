import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import { StudentModel } from '../../common/models/student';

@Injectable({
    providedIn: 'root',
})
export class StudentsServices {
    studentUrl = 'http://localhost:8080/student/';
    familiesUrl = 'http://localhost:8080/family/';

    constructor(private httpClient: HttpClient) {
        this.studentUrl = config['studentAPIEndpoint'];
        this.familiesUrl = config['familyAPIEndpoint'];
    }

    getAllStudents() {
        console.log('Students Service - Get all students');

        return this.httpClient.get(this.studentUrl + 'all');
    }

    removeGrading(hbId, grading) {
        return this.httpClient.post(
            this.studentUrl + 'removeGrading/' + hbId,
            grading
        );
    }

    getAllFamilies() {
        console.log('Students Service - Get all families');
        return this.httpClient.get(this.familiesUrl + 'all');
    }

    addNewStudent(student: StudentModel) {
        return this.httpClient.post(this.studentUrl + 'create', student);
    }

    editStudent(student: StudentModel) {
        return this.httpClient.post(
            this.studentUrl + 'update/' + student.hbId,
            student
        );
    }

    activateStudent(studentId: string) {
        return this.httpClient.post(
            this.studentUrl + 'reactivate/' + studentId,
            null
        );
    }

    deactivateStudent(studentId: string) {
        return this.httpClient.post(
            this.studentUrl + 'deactivate/' + studentId,
            null
        );
    }

    addGrading(hbId, grading) {
        return this.httpClient.post(
            this.studentUrl + 'addgrading/' + hbId,
            grading
        );
    }
}
