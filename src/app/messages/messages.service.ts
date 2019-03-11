import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  updateError = new Subject();
  updateInfo = new Subject();
  updateSuccess = new Subject();

}
