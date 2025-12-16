import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // ✅ Added ReactiveFormsModule

declare var bootstrap: any; // Keep this to close modal

@Component({
  selector: 'app-warning-msg',
  standalone: true,
  imports: [ReactiveFormsModule], // ✅ Added this
  templateUrl: './warning-msg.component.html',
  styleUrls: ['./warning-msg.component.scss']
})
export class WarningMsgComponent implements OnInit {

  memberForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get f() {
    return this.memberForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.memberForm.invalid) return;

    console.log('Form Data:', this.memberForm.value);
    this.memberForm.reset();
    this.submitted = false;

    const modalElement = document.getElementById('addMemberModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
}
