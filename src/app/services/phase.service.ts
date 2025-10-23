import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface AssignedUser {
  id: string;
  name: string;
  email: string;
}

export interface Job {
  id: string;
  name: string;
  description: string;
  status: string;
  assignedUsers?: AssignedUser[]; // nested users
  expanded?: boolean; // for UI toggle
}

export interface Phase {
  phaseCode: string;
  phaseName: string;
  startDate: string;
  endDate: string;
  status: string;
  jobs: Job[];
  expanded?: boolean; // for UI toggle
}
@Injectable({
  providedIn: 'root'
})

export class PhaseService {
  constructor(private http:HttpClient) { }
   getPhasesByProject(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/projects/${projectId}/phases`);
  }
}
