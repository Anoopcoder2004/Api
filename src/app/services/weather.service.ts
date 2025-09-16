import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'a87a0f91d5cb47bb5ddff339c250f464';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http:HttpClient) { }

  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url);
  }

}
