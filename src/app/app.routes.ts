import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { WeatherApiComponent } from './weather-api/weather-api.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // default homepage
  { path: 'weather', component: WeatherApiComponent }

];
