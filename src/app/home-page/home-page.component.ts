import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { CatService } from '../services/cat.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

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
