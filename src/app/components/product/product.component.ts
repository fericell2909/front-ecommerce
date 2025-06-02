import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';
import { MatCard, MatCardTitle, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardActions, MatCardContent]
})
export class ProductComponent {
  @Input() product!: Product;
  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
        duration: 2000,
      });
  }
}