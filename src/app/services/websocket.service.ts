import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private client!: Client;
  private messages = new Subject<any>();
  private userList = new Subject<string[]>();
  private username: string = '';

connect(username: string) {
  this.username = username;

this.client = new Client({
  webSocketFactory: () => new SockJS(`http://localhost:8080/ws?username=${this.username}`),
  reconnectDelay: 5000
});

  this.client.onConnect = () => {
    // Broadcast messages
    this.client.subscribe('/topic/messages', (msg: IMessage) => {
      this.messages.next(JSON.parse(msg.body));
    });

    // Private messages
    this.client.subscribe(`/user/${this.username}/queue/messages`, (msg: IMessage) => {
      this.messages.next(JSON.parse(msg.body));
    });

    // Connected users list
    this.client.subscribe('/topic/users', (msg: IMessage) => {
      const users = JSON.parse(msg.body);
      this.userList.next(users);
      console.log('Online users:', users); // ✅ debug log
    });

    // Request initial user list
    this.client.publish({ destination: '/app/users', body: '' });
  };

  this.client.activate();
}


  getMessages() {
    return this.messages.asObservable();
  }

  getUserList() {
    return this.userList.asObservable();
  }

  sendMessage(sender: string, receiver: string | null, content: string) {
    this.client.publish({
      destination: '/app/send',
      body: JSON.stringify({ sender, receivers: receiver ? [receiver] : [], content }),
    });
  }

  requestUserList() {
    if (this.client && this.client.connected) {
      this.client.publish({ destination: '/app/users', body: '' });
    }
  }
}
