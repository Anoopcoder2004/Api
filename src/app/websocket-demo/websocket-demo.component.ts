import { Component,NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../services/websocket.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-websocket-demo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './websocket-demo.component.html'
})
export class WebsocketDemoComponent {

  /* ----------------🔵 LOGIN VARIABLES ---------------- */
  isLoggedIn = false;
  username = '';
  password = '';
  error = '';

  /* ----------------🔵 REGISTER VARIABLES ---------------- */
  showRegister = false;   // 🔹 NEW: toggle registration screen
  regUsername = '';       // 🔹 NEW: registration username
  regPassword = '';       // 🔹 NEW: registration password
  regError = '';          // 🔹 NEW: registration error

  /* ----------------🟣 CHAT VARIABLES ---------------- */
  userList: string[] = [];
  selectedUser: string | null = null;
  messagesMap: { [user: string]: any[] } = {};
  message: string = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private wsService: WebsocketService,
    private http: HttpClient,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    // subscriptions handled AFTER login
  }

  /* ============================================================
      🔵 REGISTER USER (NEW FUNCTION)
     ============================================================ */
  register() {
    this.http.post('http://localhost:8080/api/auth/register', {
      username: this.regUsername,
      password: this.regPassword
    }).subscribe({
      next: (res: any) => {
        if (res.message === 'User registered successfully') {

          // Auto-fill login form
          this.username = this.regUsername;
          this.password = this.regPassword;

          // Switch back to login screen
          this.showRegister = false;

          // Clear registration fields
          this.regUsername = '';
          this.regPassword = '';
          this.regError = '';
        } else {
          this.regError = res.message;
        }
      },
      error: err => {
        console.error(err);
        this.regError = 'Registration failed';
      }
    });
  }

  /* ---------------- 🔵 TOGGLE LOGIN <-> REGISTER ---------------- */
  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  /* ============================================================
      🔵 LOGIN USER
     ============================================================ */
  login() {
    this.http.post('http://localhost:8080/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {

        if (res.message === 'Login success') {

          localStorage.setItem('username', this.username);
          this.isLoggedIn = true;

          // Connect WebSocket
          this.wsService.connect(this.username);

          // Subscribe to users & messages
          this.setupWebsocketSubscriptions();

          // Request initial online user list
          this.wsService.requestUserList();

        } else {
          this.error = res.message || 'Login failed';
        }
      },
      error: err => {
        console.error(err);
        this.error = 'Login failed';
      }
    });
  }

  /* ============================================================
      🟣 WEBSOCKET SUBSCRIPTIONS
     ============================================================ */
private setupWebsocketSubscriptions() {

  // 👥 User list updates
this.subscriptions.push(
  this.wsService.getUserList().subscribe(users => {
    this.zone.run(() => {
      this.userList = users.filter(u => u !== this.username);
      this.userList.forEach(u => {
        if (!this.messagesMap[u]) {
          this.messagesMap[u] = [];
        }
      });
    });
  })
);

// Only now request the user list
this.wsService.requestUserList();



  // 💬 Messages updates (unchanged)
  this.subscriptions.push(
    this.wsService.getMessages().subscribe(msg => {
      const sender = msg.sender;
      const receivers = msg.receivers;

      if (receivers && receivers.length > 0) {
        const otherUser = sender === this.username ? receivers[0] : sender;

        if (!this.messagesMap[otherUser]) {
          this.messagesMap[otherUser] = [];
        }

        this.messagesMap[otherUser].push(msg);
      } else {
        const broadcastKey = 'broadcast';

        if (!this.messagesMap[broadcastKey]) {
          this.messagesMap[broadcastKey] = [];
        }

        this.messagesMap[broadcastKey].push(msg);
      }
    })
  );
}


  /* ============================================================
      🟣 CHAT FUNCTIONS
     ============================================================ */
  getMessagesForSelectedUser() {
    if (!this.selectedUser) return [];
    return this.messagesMap[this.selectedUser] || [];
  }

  send() {
    if (!this.selectedUser || !this.message.trim()) return;

    this.wsService.sendMessage(this.username, this.selectedUser, this.message);
    this.message = '';
  }

  openChat(user: string) {
    this.selectedUser = user;
  }

  closeChat() {
    this.selectedUser = null;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
