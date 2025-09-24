import { Component } from '@angular/core';
import { CatService } from '../services/cat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.css'
})
export class CatComponent {
   fact = '';

  constructor(private catService: CatService) {}

    ngOnInit() {
      this.loadFact();
    }

    loadFact() {
      this.catService.getCatFact().subscribe((data) => {
        this.fact = data.fact;
      });
    }
}
