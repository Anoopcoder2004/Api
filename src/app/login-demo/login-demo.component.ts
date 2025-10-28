import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-demo',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login-demo.component.html',
  styleUrls: ['./login-demo.component.scss']
})
export class LoginDemoComponent {
  activeForm: 'login' | 'signup' = 'login'; // 👈 default to login

  switchForm(formType: 'login' | 'signup') {
    this.activeForm = formType;
  }
}
