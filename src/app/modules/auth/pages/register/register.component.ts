import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/layout/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  benefits: string[] = [
    'More qualified leads from every conversation',
    'Less time spent on manual prospecting',
    'Larger deals with AI-powered insights'
  ];

  constructor() {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordPatternValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error('Please fix the errors in the form');
      return;
    }

    this.isLoading = true;
    const { userName, email, password } = this.registerForm.value;

    this.authService.register(userName, email, password).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data?.success) {
          this.toastr.success('Registration successful! Check your email for OTP.');
          this.router.navigate(['/otp-verification'], {
            queryParams: {
              otpType: 'account_verification',
              email: data.data.user.email,
            },
          });
        } else {
          this.toastr.error('Registration failed. Please try again.');
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 400) {
          this.toastr.error(error.error?.message || 'Invalid registration data');
        } else if (error.status === 409) {
          this.toastr.error('Email already exists');
        } else {
          this.toastr.error('Registration failed. Please try again later');
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordPatternValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.value;
    if (!password) return null;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>])[A-Za-z\d!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>]{8,}$/;
    return passwordRegex.test(password) ? null : { invalidPassword: true };
  };

  passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    form.get('confirmPassword')?.setErrors(null);
    return null;
  };

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}