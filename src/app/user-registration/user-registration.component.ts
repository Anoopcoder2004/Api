import { Component } from '@angular/core';

import { UserTableComponent } from './user-table/user-table.component';
import { C2cdataService } from '../services/c2cdata.service';
@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [


    UserTableComponent

  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {

  constructor(private dataService: C2cdataService){}

  inputFromChild: string = '';
  parentMessage : string = '';


  handleData(data: string) {
    this.inputFromChild = data;

  }
  sendToChild(value:string){
    this.parentMessage = value;
  }
  sendDataToComponent(value:string){
    this.dataService.sendMessage(value);
  }
}