import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() productDetail: Product;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  getModifiedRating(rating: number): Array<any> {
    return new Array(rating).fill(1);
  }

  onAddToCart(): void {
    this.cartService.addToCart(this.productDetail.id);
  }
}
