import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  projectId: string;
  projectCode: string;
  projectName: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  clientName: string;
  budget: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/project-details/get-all-projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}
