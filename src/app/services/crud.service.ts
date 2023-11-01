import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from 'src/data-types';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<Message[]>('http://localhost:3000/messages');
  }

  addMessage(message: Message) {
    return this.http.post('http://localhost:3000/messages', message);
  }
}
