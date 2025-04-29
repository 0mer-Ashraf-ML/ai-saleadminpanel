import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/layout/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  email: string = '';
  otpCode: string = '';

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  constructor() {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordPatternValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );

    this.email = this.route.snapshot.queryParams['email'] || '';
    this.otpCode = this.route.snapshot.queryParams['otpCode'] || '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      this.toastr.error('Please fix the errors in the form');
      return;
    }

    this.isLoading = true;
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;

    this.authService.resetPassword(this.email, this.otpCode, newPassword).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data?.success) {
          this.toastr.success('Password reset successfully');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Password reset failed');
        }
      },
      error: (error) => {
        this.isLoading = false;

        if (error.status === 400) {
          this.toastr.error('Invalid reset request');
        } else if (error.status === 410) {
          this.toastr.error('Reset token has expired');
        } else if (error.error?.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Password reset failed. Please try again');
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return passwordRegex.test(password) ? null : { invalidPassword: true };
  };

  passwordsMatch: ValidatorFn = (form: AbstractControl) => {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  };

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }
}