import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  constructor(public toastCtrl: ToastController, private messagesService: MessagesService) {
    if (this.messagesService.updateError.observers.length === 0) {
      messagesService.updateError.subscribe((error: string) => {
        this.presentErrorToast(error);
      });
    }

    if (this.messagesService.updateInfo.observers.length === 0) {
      messagesService.updateInfo.subscribe((message: string) => {
        this.presentInfoToast(message);
      });
    }

    if (this.messagesService.updateSuccess.observers.length === 0) {
      messagesService.updateSuccess.subscribe((message: string) => {
        this.presentSuccessToast(message);
      });
    }
  }

  async presentErrorToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 100000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  async presentInfoToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
    toast.present();
  }

  async presentSuccessToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

}
