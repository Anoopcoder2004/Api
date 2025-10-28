import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-demo.component.html',
  styleUrls: ['./signup-demo.component.scss']
})
export class SignupDemoComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: (token) => {
        this.authService.saveUser(token, this.username);
        this.router.navigate(['/home-demo']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Registration failed. Try again.';
      }
    });
  }
}
