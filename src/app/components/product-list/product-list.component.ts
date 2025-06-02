import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule, ProductComponent, FormsModule],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  page = 1;
  pageSize = 10;
  totalPages = 1;
  loading = false;
  error = '';
  searchTerm = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !this.loading && this.page <= this.totalPages) {
      this.loadProducts();
    }
  }

  loadProducts(reset: boolean = false): void {
    if (this.loading || (this.page > this.totalPages && !reset)) return;

    if (reset) {
      this.products = [];
      this.page = 1;
      this.totalPages = 1;
    }

    this.loading = true;
    this.productService.getProducts(this.page, this.pageSize, this.searchTerm).subscribe({
      next: (response) => {
        this.products = [...this.products, ...response.data];
        this.totalPages = response.meta.total;
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar productos';
        this.loading = false;
      }
    });
  }
  onSearch(): void {
    this.loadProducts(true); // reiniciar lista y recargar
  }
}