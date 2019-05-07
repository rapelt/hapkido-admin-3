import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import { StudentModel } from '../../common/models/student';

@Injectable({
  providedIn: 'root'
})
export class ClassesServices {

  classUrl = 'http://localhost:8080/class/';

  constructor(private httpClient: HttpClient) {
    this.classUrl = config['classAPIEndpoint'];
  }

  getAllClasses() {
    return this.httpClient.get(this.classUrl + 'all');
  }
}
