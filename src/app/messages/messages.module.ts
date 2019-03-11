import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MessagesService } from './messages.service';

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    MessagesService
  ],
  exports: [
    MessageComponent,
    CommonModule
  ]
})
export class MessagesModule { }
