import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  constructor(public toastCtrl: ToastController, public messagesService: MessagesService) {
  }

  ngOnInit(): void {
    if (this.messagesService.updateError.observers.length === 0) {
      this.messagesService.updateError.subscribe((error: string) => {
        this.presentErrorToast(error);
      });
    }

    if (this.messagesService.updateInfo.observers.length === 0) {
      this.messagesService.updateInfo.subscribe((message: string) => {
        this.presentInfoToast(message);
      });
    }

    if (this.messagesService.updateSuccess.observers.length === 0) {
      this.messagesService.updateSuccess.subscribe((message: string) => {
        this.presentSuccessToast(message);
      });
    }
  }

  async presentErrorToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger',
      cssClass: 'cy-error'
    });
    toast.present();
  }

  async presentInfoToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'warning',
      cssClass: 'cy-info'

    });
    toast.present();
  }

  async presentSuccessToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'success',
      cssClass: 'cy-success'
    });
    toast.present();
  }

  ngOnDestroy() {
    this.messagesService.updateError.unsubscribe();
    this.messagesService.updateInfo.unsubscribe();
    this.messagesService.updateSuccess.unsubscribe();
  }


}
