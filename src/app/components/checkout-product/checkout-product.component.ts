import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.css'],
})
export class CheckoutProductComponent implements OnInit {
  @Input() cartItem: CartItem;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  getModifiedRating(rating: number): Array<any> {
    return new Array(rating).fill(1);
  }

  onRemoveFromCart() {
    this.cartService.removeFromCart(this.cartItem.id);
  }
}
