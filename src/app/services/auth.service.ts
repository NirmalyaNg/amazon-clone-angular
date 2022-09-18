import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { Observable, tap, BehaviorSubject, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;
  private signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`;
  private logoutTimer: any = null;
  public loggedInUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleAuthenticationError.bind(this)),
        tap(this.handleAuthenticationSuccess.bind(this))
      );
  }

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.signupUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleAuthenticationError.bind(this)),
        tap(this.handleAuthenticationSuccess.bind(this))
      );
  }

  autoLogin() {
    const userDetails: {
      _token: string;
      _expirationDate: string;
      userId: string;
      email: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (!userDetails) {
      return;
    }
    const expirationDate = new Date(userDetails._expirationDate);
    const storedUser = new User(
      userDetails.userId,
      userDetails.email,
      userDetails._token,
      expirationDate
    );

    if (storedUser.token) {
      const duration =
        new Date(userDetails._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(duration);
      this.loggedInUser.next(storedUser);
    }
  }

  autoLogout(duration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  logout() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
    localStorage.removeItem('user');
    this.loggedInUser.next(null);
  }

  private handleAuthenticationSuccess(authResponse: AuthResponse): void {
    const expirationDate = new Date(
      new Date().getTime() + +authResponse.expiresIn * 1000
    );
    const user = new User(
      authResponse.localId,
      authResponse.email,
      authResponse.idToken,
      expirationDate
    );

    localStorage.setItem('user', JSON.stringify(user));
    this.autoLogout(+authResponse.expiresIn * 1000);
    this.loggedInUser.next(user);
  }

  private handleAuthenticationError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured !';
    if (errorResponse.error && errorResponse.error.error) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid Credentials';
          break;
        case 'USER_DISABLED':
          errorMessage = 'User is disabled';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'Email is already registered.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER ':
          errorMessage = 'Too many attempts. Try again later.';
      }
    }
    return throwError(() => errorMessage);
  }
}
