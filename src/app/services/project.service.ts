import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  projectId: string;
  projectCode: string;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  clientName: string;
  budget: number;
}

export interface Phase {
  phaseCode: string;
  phaseName: string;
  startDate: string;
  endDate: string;
  phaseStatus: string;

}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';
  private apiUrl1 = 'http://localhost:8080/api/phases';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  
  getPhases(): Observable<Phase[]> {
    return this.http.get<Phase[]>(this.apiUrl1);
  }
  
}
