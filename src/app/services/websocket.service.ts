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
      // Broadcast
      this.client.subscribe('/topic/messages', (msg: IMessage) => {
        this.messages.next(JSON.parse(msg.body));
      });

      // 🔥 FIXED — correct private message path
      this.client.subscribe('/user/queue/messages', (msg: IMessage) => {
        this.messages.next(JSON.parse(msg.body));
      });

      // Online users
      this.client.subscribe('/topic/users', (msg: IMessage) => {
        this.userList.next(JSON.parse(msg.body));
      });

      // request online users
      this.requestUserList();
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
    const message = { sender, receivers: receiver ? [receiver] : [], content };

    // Send message to backend
    this.client.publish({
      destination: '/app/send',
      body: JSON.stringify(message),
    });

    // Immediately show in sender's UI
    this.messages.next(message);
  }

  requestUserList() {
    if (this.client?.connected) {
      this.client.publish({ destination: '/app/users', body: '' });
    }
  }
}
