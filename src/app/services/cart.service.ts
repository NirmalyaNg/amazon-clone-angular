import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: CartItem[] = [
    {
      id: 'p1',
      title: 'Adorn India Chandler L Shape 5 Seater Sofa Set Plain',
      price: '23999',
      rating: 5,
      quantity: 1,
      imageUrl:
        'https://images-eu.ssl-images-amazon.com/images/I/31wFbn6-XUL._SY300_SX300_QL70_FMwebp_.jpg',
    },
  ];
  public cartChanged = new BehaviorSubject<CartItem[]>([
    {
      id: 'p1',
      title: 'Adorn India Chandler L Shape 5 Seater Sofa Set Plain',
      price: '23999',
      rating: 5,
      quantity: 1,
      imageUrl:
        'https://images-eu.ssl-images-amazon.com/images/I/31wFbn6-XUL._SY300_SX300_QL70_FMwebp_.jpg',
    },
  ]);

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
    console.log(id);
    console.log(this._cart);
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
