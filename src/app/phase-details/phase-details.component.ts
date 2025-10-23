import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { PhaseService } from '../services/phase.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-phase-details',
  standalone: true,
  imports: [AppComponent,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './phase-details.component.html',
  styleUrl: './phase-details.component.scss'
})
export class PhaseDetailsComponent {
  projectId!: string;
  phases: any[] = [];
  displayedColumns: string[] = [
    'phaseName',
    'phaseCode',
    'startDate',
    'endDate',
    'status'
    // 'actions'
  ];

  constructor(
    private phaseService: PhaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id = params.get('projectId');
      if(id){
        this.projectId = id;
        this.loadPhases();
      }
    })
  }

    loadPhases() {
    this.phaseService.getPhasesByProject(this.projectId).subscribe(phases => {
      this.phases = phases;
    });
  }
    viewJobs(phaseId: string) {
    this.router.navigate([`/projects/${this.projectId}/phases/${phaseId}/jobs`]);
  }

  editPhase(phaseId: string) {
    console.log('Edit phase:', phaseId);
    // open dialog or navigate to edit form
  }

  deletePhase(phaseId: string) {
    console.log('Delete phase:', phaseId);
    // call delete API if needed
  }

}