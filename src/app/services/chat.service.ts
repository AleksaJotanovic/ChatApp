import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { Message } from 'src/data-types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages$ = new BehaviorSubject<Message[] | null>(null)
  storageEvent$ = fromEvent<StorageEvent>(window, 'storage');

  constructor(private crud: CrudService) { }

  addMessage(message: Message) {
    this.crud.addMessage(message).subscribe(() => {
      this.crud.getMessages().subscribe((messages: Message[]) => this.messages$.next(messages));
    });
  }

  initializeMessages() {
    this.crud.getMessages().subscribe((messages: Message[]) => this.messages$.next(messages));
  }

  dateTime(): string {
    let date = new Date();
    let currentDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    let currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let dateTime = `${currentDate} ${currentTime}`;
    return dateTime;
  }

}
