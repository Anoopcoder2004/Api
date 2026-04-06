import { Component } from '@angular/core';

import { UserTableComponent } from './user-table/user-table.component';

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

  inputFromChild: string = '';


  handleData(data: string) {
    this.inputFromChild = data;

  }
}