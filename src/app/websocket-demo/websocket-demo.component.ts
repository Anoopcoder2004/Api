import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-websocket-demo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './websocket-demo.component.html',
  styleUrls: ['./websocket-demo.component.scss'] // fixed typo from styleUrl -> styleUrls
})
export class WebsocketDemoComponent {
  message: string = '';
  messages: string[] = [];


  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    // Subscribe to messages coming from WebSocket
    this.wsService.getMessages().subscribe(msg => {
      this.messages.push(msg); // only update from server
    });
  }

  // Placeholder for WebSocket client (you'll initialize it)
  // private stompClient: Stomp.Client;

send() {
  if (this.message.trim()) {
    this.wsService.sendMessage('Anoop', this.message); // first arg = sender
    this.message = '';
  }
}

}
