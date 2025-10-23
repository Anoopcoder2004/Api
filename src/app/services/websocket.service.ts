import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private client: Client;
  private messages = new Subject<any>();

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'),
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      this.client.subscribe('/topic/messages', (msg: IMessage) => {
        this.messages.next(JSON.parse(msg.body));
      });
    };

    this.client.activate();
  }

  getMessages() {
    return this.messages.asObservable();
  }

  sendMessage(sender: string, content: string) {
    this.client.publish({
      destination: '/app/send',
      body: JSON.stringify({ sender, content }),
    });
  }
}
