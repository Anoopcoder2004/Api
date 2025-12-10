import { Component } from '@angular/core';

@Component({
  selector: 'app-debugger',
  standalone: true,
  imports: [],
  templateUrl: './debugger.component.html',
  styleUrl: './debugger.component.scss'
})
export class DebuggerComponent {
  aaa: number = 0;



  ngOnInit() {
    this.button();
  }

  button() {


    this.aaa=1;


    this.aaa = 2;


    this.aaa = 3;


  }
}
