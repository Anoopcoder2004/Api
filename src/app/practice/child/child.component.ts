import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  rows: { id: number; name: string; status: string }[] = [
    { id: 1, name: 'Anoop', status: 'Active' },
    { id: 2, name: 'Ravi', status: 'Inactive' },
  ];

  newName: string = '';
  newStatus: string = 'Active';
  showAddModal: boolean = false;

  // Output event for requesting delete
  @Output() deleteRequest = new EventEmitter<string>();

  openAddModal() {
    this.newName = '';
    this.newStatus = 'Active';
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addRow() {
    if (this.newName.trim()) {
      const newId = this.rows.length ? Math.max(...this.rows.map(r => r.id)) + 1 : 1;
      this.rows.push({ id: newId, name: this.newName.trim(), status: this.newStatus });
      this.closeAddModal();
    }
  }

  // Instead of deleting here, emit an event to parent
  requestDelete(rowName: string) {
    this.deleteRequest.emit(rowName);
  }

  // Called by parent when confirmed
  deleteRow(rowName: string) {
    const index = this.rows.findIndex(r => r.name === rowName);
    if (index !== -1) {
      this.rows.splice(index, 1);
    }
  }
}