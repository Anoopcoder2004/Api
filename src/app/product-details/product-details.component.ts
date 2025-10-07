import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  tableData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // default
  totalPages: number = 1;
  itemsOptions: number[] = [10, 20, 50]; 

  constructor(
    private http: HttpClient,
    private router:Router

  ) {
    this.getTableData();
  }

  getTableData() {
    this.http.get<any>('https://dummyjson.com/products')
      .subscribe({
        next: (res) => {
          this.tableData = res.products;
          this.updateTotalPages();
        },
        error: (err) => console.error(err)
      });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.tableData.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = +event.target.value; // convert string to number
    this.currentPage = 1; // reset to first page
    this.updateTotalPages();
  }
  onProductClick(productId:number){
    this.router.navigate(['/product-info',productId]);
}
}