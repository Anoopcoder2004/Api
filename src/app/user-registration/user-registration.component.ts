import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl:'./user-registration.component.scss'
})
export class UserRegistrationComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
    } else {
      console.log('Form Invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
