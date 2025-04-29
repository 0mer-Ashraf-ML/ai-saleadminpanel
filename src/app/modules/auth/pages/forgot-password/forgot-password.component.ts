import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/layout/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  constructor() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      this.toastr.error('Please enter a valid email address');
      return;
    }

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data?.success) {
          this.toastr.success('Verification code sent to your email');
          this.router.navigate(['/otp-verification'], {
            queryParams: {
              otpType: 'password_reset',
              email: email
            }
          });
        } else {
          this.toastr.error('Failed to send verification code');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Password reset error:', error);
        
        if (error.status === 404) {
          this.toastr.error('Email not found');
        } else if (error.error?.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Failed to process your request. Please try again later');
        }
      }
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }
}