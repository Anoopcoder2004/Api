import { Component } from '@angular/core';

@Component({
  selector: 'app-karma-jasmine',
  standalone: true,
  imports: [],
  templateUrl: './karma-jasmine.component.html',
  styleUrl: './karma-jasmine.component.scss'
})
export class KarmaJasmineComponent {

  title = 'Hello World';
  add(a: number, b: number) {
    return a + b;
  }
}

