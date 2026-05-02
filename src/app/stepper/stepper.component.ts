import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { C2cdataService } from '../services/c2cdata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    RouterModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {

  wizardForm!: FormGroup;
  activeTab = 0;

  constructor(
    private fb: FormBuilder,
    private dataService: C2cdataService

  ) { }
  ngOnInit() {
    this.wizardForm = this.fb.group({
      detailsForm: this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
      }),

      existingUserForm: this.fb.group({
        userId: [''],
        email: [''],
      }),

      credentialsForm: this.fb.group({
        password: [''],
        confirmPassword: [''],
      }),

      sessionForm: this.fb.group({
        sessionTimeout: [30],
      }),

      identityProviderForm: this.fb.group({
        providerName: [''],
        clientId: [''],
      })
    });
  }

  setTab(index: number) {
    this.activeTab = index;
  }

  nextTab() {
    this.activeTab++;
  }

  prevTab() {
    this.activeTab--;
  }
  submit() {
  console.log('FORM VALUE:', this.wizardForm.value);
}
}
