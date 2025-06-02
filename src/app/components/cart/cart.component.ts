import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';
import { NgIf, NgFor } from '@angular/common';
import { MatButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [NgIf, NgFor, MatButton, MatIcon]
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getItems();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
    this.snackBar.open('Producto eliminaro del carrito', 'Cerrar', {
        duration: 2000,
      });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * 1), 0);
  }
}