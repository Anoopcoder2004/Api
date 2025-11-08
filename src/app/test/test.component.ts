import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [MatFormField,MatInputModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {


  incrementValue() {
  const input = document.getElementById('workingHours') as HTMLInputElement;
  if (input) input.stepUp();
}

decrementValue() {
  const input = document.getElementById('workingHours') as HTMLInputElement;
  if (input) input.stepDown();
}


}
