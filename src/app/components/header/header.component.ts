import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartLength: number;
  subscriptions = new Subscription();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartChanged.subscribe((cart) => {
        console.log(cart);
        this.cartLength = cart ? cart.length : 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
