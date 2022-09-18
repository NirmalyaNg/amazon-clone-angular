import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SpinnerService } from './services/spinner.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader = true;
  subscriptions = new Subscription();
  isLoading = false;
  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showHeader = !event.url.includes('login');
        }
      })
    );

    this.subscriptions.add(
      this.spinnerService.isLoading.subscribe((status: boolean) => {
        this.isLoading = status;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
