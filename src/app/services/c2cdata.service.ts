import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class C2cdataService {

  private messageSource = new BehaviorSubject<string>('');
  currentMessage$ = this.messageSource.asObservable();

  constructor() { }
  sendMessage(message: string){
    this.messageSource.next(message);
  }
}
