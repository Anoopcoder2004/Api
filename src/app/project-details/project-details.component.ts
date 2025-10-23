import { Component, OnInit } from '@angular/core';
import { ProjectService,Project } from '../services/project.service';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [AppComponent,CommonModule,RouterModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {
projects:Project[]=[];

  constructor(
    private projectService: ProjectService,
    private router:Router
  ) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error fetching projects', err)
    });
  }
  goToPhases(projectId: string) {
  this.router.navigate(['/projects', projectId, 'phases']);
}

}
