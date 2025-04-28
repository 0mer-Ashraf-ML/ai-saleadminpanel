import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/layout/services/auth.service';
import { CommonService } from 'src/app/modules/layout/services/common.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoggedIn = false;
  loginForm: any;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordPatternValidator]],
      rememberMe: [false],
    });
  }

  showPassword = false;
  isLoading = false;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly commonService = inject(CommonService);
  private readonly toastr = inject(ToastrService);

  ngOnInit() {
    this.isLoggedIn = this.commonService.isLoggedIn();
  }
  
  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please fix the errors in the form');
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.commonService.setToken(data.data.accessToken.access_token);
        this.commonService.setUser(data.data.user);
        this.toastr.success('Login successful');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;

        if (error.status === 401) {
          this.toastr.error('Invalid email or password');
        } else if (error.error?.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Login failed. Please try again later');
        }
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  passwordPatternValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.value;
    if (!password) return null;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>]).{8,}$/;
    return regex.test(password) ? null : { invalidPassword: true };
  };

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
