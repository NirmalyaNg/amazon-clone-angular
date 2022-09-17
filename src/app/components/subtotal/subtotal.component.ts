import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-subtotal',
  templateUrl: './subtotal.component.html',
  styleUrls: ['./subtotal.component.css'],
})
export class SubtotalComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  subscription = new Subscription();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.subscription.add(
      this.cartService.cartChanged.subscribe((cart) => {
        this.cart = cart;
      })
    );
  }

  getCartTotal(): number {
    return this.cart
      .map((item) => parseFloat(item.price) * item.quantity)
      .reduce((val1, val2) => {
        return val1 + val2;
      }, 0);
  }

  getCartCount(): number {
    return this.cart
      .map((item) => item.quantity)
      .reduce((val1, val2) => {
        return val1 + val2;
      }, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
