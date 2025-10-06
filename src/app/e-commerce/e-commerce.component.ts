import { Component,OnInit } from '@angular/core';
import { ECommerceService } from '../services/e-commerce.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-e-commerce',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './e-commerce.component.html',
  styleUrl: './e-commerce.component.css'
})
export class ECommerceComponent implements OnInit {

  products: any[] = [];

  constructor(private ecommerceService: ECommerceService) { }
  ngOnInit(): void {
    this.ecommerceService.getProducts().subscribe((data: any) => {
      this.products = data.slice(0, 10);
    });

  }
}
