import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss',
})
export class PracticeComponent {
  showSearch = false;
  selectedOptions: any[] = [];
  options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];




  rows = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
  }));

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  closeSearch() {
    this.showSearch = false;
  }
}
