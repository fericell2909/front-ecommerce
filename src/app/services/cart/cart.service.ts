import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'my_cart';
  private cartItems: Product[] = [];
  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor() {
    const savedCart = localStorage.getItem(this.cartKey);
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    this.totalItemsSubject.next(this.cartItems.length);
  }

  getItems(): Product[] {
    return [...this.cartItems];
  }

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.saveCart();
    this.totalItemsSubject.next(this.cartItems.length);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCart();
    this.totalItemsSubject.next(this.cartItems.length);
    
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
    this.totalItemsSubject.next(0);
  }

  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  getTotalItems(): number {
    return this.cartItems.length;
  }
}