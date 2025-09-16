import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-api',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './weather-api.component.html',
  styleUrl: './weather-api.component.css'
})

export class WeatherApiComponent {
  city:string='';
  weatherData:any;

  constructor(private weatherService:WeatherService){}
  fetchWeather(){
    if(!this.city) return;
    this.weatherService.getWeatherByCity(this.city).subscribe({
      next:(data)=> this.weatherData = data,
      error:() => this.weatherData = null
    });
  }
}
