import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {

  @Output() notify = new EventEmitter<string>();
  @Input() messageFromParent : string = '';
  sendData(value : string){
    this.notify.emit(value);
  }
}
