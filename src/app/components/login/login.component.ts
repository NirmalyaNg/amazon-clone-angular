import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  error: string = null;
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  handleSubmit() {
    this.error = null;
    if (!this.loginForm.valid) {
      return;
    }
    this.spinnerService.startLoading();
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.spinnerService.stopLoading();
        this.error = null;
        this.router.navigate(['/home']);
      },
      error: (errMessage: string) => {
        this.error = errMessage;
        this.spinnerService.stopLoading();
      },
    });
  }

  handleSignup() {
    this.error = null;
    if (!this.loginForm.valid) {
      return;
    }
    this.spinnerService.startLoading();
    const { email, password } = this.loginForm.value;
    this.authService.signup(email, password).subscribe({
      next: () => {
        this.spinnerService.stopLoading();
        this.error = null;
        this.router.navigate(['/home']);
      },
      error: (errMessage: string) => {
        this.error = errMessage;
        this.spinnerService.stopLoading();
      },
    });
  }
}
