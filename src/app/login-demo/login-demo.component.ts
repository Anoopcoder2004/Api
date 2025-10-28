import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-demo.component.html',
  styleUrls: ['./login-demo.component.scss']
})
export class LoginDemoComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (token) => {
        this.authService.saveUser(token, this.email);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Invalid email or password';
      }
    });
  }
}
