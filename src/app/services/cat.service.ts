import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'https://catfact.ninja/fact';

  constructor(private http: HttpClient) {}

  getCatFact():Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

}
