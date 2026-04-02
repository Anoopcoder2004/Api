import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent implements OnInit, AfterViewInit {

  userForm!: FormGroup;

  // 👇 reference to ng-select
  @ViewChild('qualSelect', { read: ElementRef }) selectRef!: ElementRef;

  private ctx!: CanvasRenderingContext2D;
  containerWidth = 0;

  qualificationsList = [
    { id: 1, label: 'Bachelor of Science in Computer Science' },
    { id: 2, label: 'Master of Science in Artificial Intelligence and Machine Learning and aritifial intellignce' },
    { id: 3, label: 'Bachelor of Technology in Electrical and Electronics Engineering' },
    { id: 4, label: 'Master of Technology in Computer Science and Engineering' },
    { id: 5, label: 'Postgraduate Diploma in Data Science and Business Analytics' },
    { id: 6, label: 'Doctor of Philosophy in Software Engineering and Distributed Systems' }
  ];

  skillsList = [
    { id: 1, label: 'Angular' },
    { id: 2, label: 'Java' },
    { id: 3, label: 'Spring Boot' },
    { id: 4, label: 'SQL' }
  ];

  experienceList = [
    { id: 1, label: '0-1 years' },
    { id: 2, label: '1-3 years' },
    { id: 3, label: '3+ years' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      qualifications: [[]],
      skills: [[]],
      experience: [null]
    });
  }

  // 🔥 initialize canvas for text measurement
  ngAfterViewInit() {
    const canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d')!;
    this.ctx.font = '14px Arial'; // match your CSS font

    this.updateContainerWidth();
  }

  // 🔄 recalc on resize
  @HostListener('window:resize')
  onResize() {
    this.updateContainerWidth();
  }

  updateContainerWidth() {
    if (this.selectRef) {
      // buffer for padding + icons
      this.containerWidth = this.selectRef.nativeElement.offsetWidth - 60;
    }
  }

  measureText(text: string): number {
    return this.ctx.measureText(text).width;
  }

  // 🚀 Accurate display logic
  getDisplayTextAccurate(items: any[]): string {
    if (!items || items.length === 0) return '';

    let usedWidth = 0;
    const result: string[] = [];

    for (let i = 0; i < items.length; i++) {
      let label = items[i].label;

      // 🔴 handle single very long item
      if (this.measureText(label) > this.containerWidth) {
        while (this.measureText(label + '...') > this.containerWidth && label.length > 0) {
          label = label.slice(0, -1);
        }
        return label + '...';
      }

      const textWithComma = result.length ? ', ' + label : label;
      const textWidth = this.measureText(textWithComma);

      const remaining = items.length - i - 1;
      const moreText = remaining > 0 ? ` +${remaining} more` : '';
      const moreWidth = this.measureText(moreText);

      // 🧠 main condition
      if (usedWidth + textWidth + moreWidth > this.containerWidth) {
        if (remaining >= 0) {
          result.push(`+${remaining + 1} more`);
        }
        break;
      }

      result.push(label);
      usedWidth += textWidth;
    }

    return result.join(', ');
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