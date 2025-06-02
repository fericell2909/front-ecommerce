import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbar, MatIcon, CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  totalItems = 0;
  private cartSubscription!: Subscription;
  constructor(private cartService: CartService, public authService: AuthService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.totalItems$.subscribe(
      count => this.totalItems = count
    );
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }

}