import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProduct implements OnInit {
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
