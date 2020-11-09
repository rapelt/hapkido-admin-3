import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  updateError;
  updateInfo;
  updateSuccess;

  constructor() {
    this.updateError = new Subject();
    this.updateInfo = new Subject();
    this.updateSuccess = new Subject();
  }


}
