import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ChildComponent
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
  showDeleteModal = false;
  rowToDelete = '';

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  closeSearch() {
    this.showSearch = false;
  }

// called when child emits delete event
onDeleteRequest(name: string) {
  this.rowToDelete = name;
  this.showDeleteModal = true;
}

// confirm delete
confirmDelete(child: any) {
  child.deleteRow(this.rowToDelete);
  this.showDeleteModal = false;
  this.rowToDelete = '';
}

// cancel delete
cancelDelete() {
  this.showDeleteModal = false;
  this.rowToDelete = '';
}
}
