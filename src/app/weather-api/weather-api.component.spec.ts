import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';                     // 🟢 Added: to mock Observable responses
import { WeatherApiComponent } from './weather-api.component';
import { WeatherService } from '../services/weather.service'; // 🟢 Added: import the service to mock it

describe('WeatherApiComponent', () => {
  let component: WeatherApiComponent;
  let fixture: ComponentFixture<WeatherApiComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;   // 🟢 Added: create a spy (mock) object

  beforeEach(async () => {
    // 🟢 Create a spy for WeatherService with a fake "getWeatherByCity" method
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeatherByCity']);

    await TestBed.configureTestingModule({
      imports: [WeatherApiComponent],                       // ✅ Keep this since it's standalone
      providers: [
        { provide: WeatherService, useValue: mockWeatherService } // 🟢 Inject our mock service
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 🟢 New Test: Should not call the service if city is empty
  it('should not call service if city is empty', () => {
    component.city = '';
    component.fetchWeather();
    expect(mockWeatherService.getWeatherByCity).not.toHaveBeenCalled();
  });

  // 🟢 New Test: Should set weatherData on success
  it('should set weatherData on success', () => {
    const mockData = { temp: 30 };
    mockWeatherService.getWeatherByCity.and.returnValue(of(mockData));

    component.city = 'Delhi';
    component.fetchWeather();

    expect(mockWeatherService.getWeatherByCity).toHaveBeenCalledWith('Delhi');
    expect(component.weatherData).toEqual(mockData);
  });

  // 🟢 New Test: Should set weatherData to null on error
  it('should set weatherData to null on error', () => {
    mockWeatherService.getWeatherByCity.and.returnValue(
      throwError(() => new Error('API error'))
    );

    component.city = 'Mumbai';
    component.fetchWeather();

    expect(mockWeatherService.getWeatherByCity).toHaveBeenCalledWith('Mumbai');
    expect(component.weatherData).toBeNull();
  });
});
