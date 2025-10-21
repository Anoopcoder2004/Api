import { Component, OnInit } from '@angular/core';
import { ProjectService,Phase } from '../services/project.service';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-phase-details',
  standalone: true,
  imports: [AppComponent,CommonModule,RouterModule],
  templateUrl: './phase-details.component.html',
  styleUrl: './phase-details.component.scss'
})
export class PhaseDetailsComponent implements OnInit {
phases:Phase[]=[];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getPhases().subscribe({
      next: (data) => this.phases = data,
      error: (err) => console.error('Error fetching projects', err)
    });
  }

}