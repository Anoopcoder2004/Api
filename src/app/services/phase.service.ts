import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

  export interface Phase {
  id: string;
  phaseCode: string;
  phaseName: string;
  startDate: string;
  endDate: string;
  status: string;
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
