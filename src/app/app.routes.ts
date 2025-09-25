import { Routes } from '@angular/router';
import { WeatherApiComponent } from './weather-api/weather-api.component';
import { CatComponent } from './cat/cat.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'weather', component: WeatherApiComponent },
  { path: 'cat',component: CatComponent},
  { path: 'pokemon',component: PokemonComponent},
  { path: 'dashboard', component: DashboardComponent }

];
