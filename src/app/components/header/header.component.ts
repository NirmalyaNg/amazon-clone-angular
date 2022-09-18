import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartLength: number;
  subscriptions = new Subscription();
  isLoggedIn = false;
  loggedInUser: User = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  handleLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.loggedInUser.subscribe((user) => {
        this.isLoggedIn = !!user;
        if (!!user) {
          this.loggedInUser = user;
        }
      })
    );

    this.subscriptions.add(
      this.cartService.cartChanged.subscribe((cart) => {
        this.cartLength = cart.length;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
