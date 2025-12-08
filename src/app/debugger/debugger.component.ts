import { Component } from '@angular/core';

@Component({
  selector: 'app-debugger',
  standalone: true,
  imports: [],
  templateUrl: './debugger.component.html',
  styleUrl: './debugger.component.scss'
})
export class DebuggerComponent {
aaa:number;
bbb:any;
ccc:any;


  constructor(){
    this.aaa=10;


    this.aaa=20;

    this.aaa=30;
  }
}
