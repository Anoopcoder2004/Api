import { Routes } from '@angular/router';
import { WeatherApiComponent } from './weather-api/weather-api.component';
import { CatComponent } from './cat/cat.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { StepperComponent } from './stepper/stepper.component';
import { ProductDetailsComponent } from './product-details/product-details.component'; 
import { ProductInfoComponent } from './product-details/product-info/product-info.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { PhaseDetailsComponent } from './phase-details/phase-details.component';
import { WebsocketDemoComponent } from './websocket-demo/websocket-demo.component';
import { LoginDemoComponent } from './login-demo/login-demo.component';
import { SignupDemoComponent } from './signup-demo/signup-demo.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TestComponent } from './test/test.component';  
import { KonvaComponent } from './konva/konva.component';

export const routes: Routes = [

  { path: 'weather', component: WeatherApiComponent },
  { path: 'cat',component: CatComponent},
  { path: 'pokemon',component: PokemonComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'e-commerce', component: ECommerceComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'product-info/:id', component: ProductInfoComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'project-details', component:ProjectDetailsComponent },
  { path: 'projects/:projectId/phases', component: PhaseDetailsComponent },
  { path:'websocket-demo',component:WebsocketDemoComponent },
  { path:'login-demo',component:LoginDemoComponent },
  { path:'signup-demo',component:SignupDemoComponent },
  { path:'home',component:HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'test', component: TestComponent },
  { path: 'konva',component:KonvaComponent}


];
