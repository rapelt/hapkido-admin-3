import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import { StudentModel } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsServices {

  studentUrl = 'http://localhost:8080/student/';

  constructor(private httpClient: HttpClient) {
    this.studentUrl = config['studentAPIEndpoint'];
  }

  getAllStudents() {
    return this.httpClient.get(this.studentUrl + 'all');
  }



}
