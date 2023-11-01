import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { CrudService } from 'src/app/services/crud.service';
import { Message } from 'src/data-types';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  sentMessages: Message[] = [];
  receivedMessages: Message[] = [];
  me: string = 'client';
  sender: string = 'admin';

  constructor(private chatService: ChatService, private crud: CrudService) { }

  ngOnInit(): void {
    // Received messages
    this.crud.getMessages().subscribe((messages: Message[]) => {
      this.receivedMessages = messages.filter((message) => message.sender === this.sender);
    });
    this.chatService.storageEvent$.subscribe((event: StorageEvent) => {
      if (event.key === 'messages') {
        let storageMessages: Message[] = event.newValue !== null && JSON.parse(event.newValue);
        if (storageMessages !== null) {
          this.receivedMessages = storageMessages.filter((message) => message.sender === this.sender);
        }
      }
    });

    // Sent messages
    this.chatService.messages$.subscribe((messages) => {
      let clientMessages = messages?.filter((message) => message.sender === this.me);
      this.sentMessages = clientMessages as Message[];
      localStorage.setItem('messages', JSON.stringify(messages));
    });
  }

  addMessage(message: Message) {
    let messageToSend: Message = {
      id: uuid(),
      sender: this.me,
      content: message.content,
      timestamp: this.chatService.dateTime()
    }
    this.chatService.addMessage(messageToSend);
  }
}
