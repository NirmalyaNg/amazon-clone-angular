import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: CartItem[] = [];
  public cartChanged = new BehaviorSubject<CartItem[]>([]);

  constructor(private productService: ProductService) {}

  public get cart(): CartItem[] {
    return this._cart.slice();
  }

  public addToCart(id: string): void {
    const item = this._cart.find((cItem) => cItem.id === id);
    if (item) {
      item.quantity++;
    } else {
      const product: Product = this.productService.getProduct(id);
      this._cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        rating: product.rating,
      });
    }
    this.cartChanged.next(this._cart);
  }

  public removeFromCart(id: string) {
    const itemIndex = this._cart.findIndex((cItem) => cItem.id === id);
    console.log(itemIndex);
    if (this._cart[itemIndex].quantity > 1) {
      this._cart[itemIndex].quantity--;
    } else {
      this._cart.splice(itemIndex, 1);
    }
    this.cartChanged.next(this._cart);
  }
}
