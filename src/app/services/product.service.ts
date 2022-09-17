import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _products: Product[] = [
    {
      id: 'p1',
      title: 'Adorn India Chandler L Shape 5 Seater Sofa Set Plain',
      price: '23999',
      rating: 5,
      imageUrl:
        'https://images-eu.ssl-images-amazon.com/images/I/31wFbn6-XUL._SY300_SX300_QL70_FMwebp_.jpg',
    },
    {
      id: 'p2',
      title: 'Pro Angular: Build Powerful and Dynamic Web Apps',
      price: '4350',
      rating: 5,
      imageUrl:
        'https://m.media-amazon.com/images/I/61inDoflRUL._AC_UY218_.jpg',
    },
    {
      id: 'p3',
      title: 'Apple iPhone 13 (128GB) - Starlight',
      price: '62500',
      rating: 5,
      imageUrl: 'https://m.media-amazon.com/images/I/71GLMJ7TQiL._SX679_.jpg',
    },
    {
      id: 'p4',
      title:
        'HP 15s, 11th Gen Intel Core i3, 8GB RAM/512GB SSD 15.6-inch(39.6 cm)',
      price: '42999',
      rating: 5,
      imageUrl:
        'https://m.media-amazon.com/images/I/91oF9q-jE5L._AC_UY218_.jpg',
    },
    {
      id: 'p5',
      title: 'Croma 500W Mixer Grinder with 3 Stainless Steel Leak-proof Jars',
      price: '1450',
      rating: 3,
      imageUrl:
        'https://m.media-amazon.com/images/I/71jhtTqFAFL._AC_UY218_.jpg',
    },
    {
      id: 'p6',
      title: 'JBL Endurance RunBT, Sports in Ear Wireless Bluetooth Earphones',
      price: '1699',
      rating: 4,
      imageUrl:
        'https://m.media-amazon.com/images/I/61Kss6a0ldL._AC_UY218_.jpg',
    },
  ];
  constructor() {}

  public get products(): Product[] {
    return this._products.slice();
  }

  public getProduct(id: string): Product {
    const product: Product = this._products.find((p) => p.id === id);
    return { ...product };
  }
}
