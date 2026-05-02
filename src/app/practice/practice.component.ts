import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { increment, decrement } from '../store/counter.actions';
interface AppState {
  counter: number;
}
@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice.component.html',
})
export class PracticeComponent {

  ngOnInit() {
  console.log('Practice component loaded');
}

  counter$!: any;

  constructor(private store: Store<AppState>) {
    this.counter$ = this.store.select('counter');
  }

  inc() {
    this.store.dispatch(increment());
  }

  dec() {
    this.store.dispatch(decrement());
  }
}