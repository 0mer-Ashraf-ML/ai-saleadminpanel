import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/layout/services/auth.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './otp.component.html'
})
export class OtpComponent {
  otpForm: FormGroup;
  isLoading = false;
  countdown = 30;
  canResend = false;
  otpType: string = '';
  email: string = '';

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  constructor() {
    this.otpForm = this.fb.group({
      otp: this.fb.array<FormControl>(
        Array.from({ length: 5 }, () => this.fb.control('', [
          Validators.required,
          Validators.pattern(/^\d$/)
        ]))
      )
    });

    this.otpType = this.route.snapshot.queryParams['otpType'] || '';
    this.email = this.route.snapshot.queryParams['email'] || '';
    this.startCountdown();
  }

  get otp(): FormArray<FormControl> {
    return this.otpForm.get('otp') as FormArray<FormControl>;
  }

  startCountdown(): void {
    this.canResend = false;
    this.countdown = 30;
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.canResend = true;
        clearInterval(interval);
      }
    }, 1000);
  }

  focusNext(index: number, event: any): void {
    const value = event.target.value;
    this.otp.controls[index].setValue(value);
    this.otp.markAsDirty();

    if (value && index < 4) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  focusPrev(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && index > 0 && !this.otp.controls[index].value) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  onSubmit(): void {
    if (this.otpForm.invalid) {
      this.toastr.error('Please enter a complete 5-digit OTP code');
      return;
    }

    this.isLoading = true;
    const enteredOtp = this.otp.value.join('');
    const otpPurpose = this.otpType === "account_verification" 
      ? "account_verification" 
      : "password_reset";

    this.authService.verifyOtp(enteredOtp, this.email, otpPurpose).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data?.success) {
          this.toastr.success('OTP verified successfully');
          this.handleSuccessfulVerification(enteredOtp);
        } else {
          this.toastr.error('Invalid OTP code');
        }
      },
      error: (error) => {
        this.isLoading = false;
        
        if (error.status === 400) {
          this.toastr.error('Invalid OTP code');
        } else if (error.status === 410) {
          this.toastr.error('OTP has expired');
        } else {
          this.toastr.error('OTP verification failed. Please try again');
        }
      }
    });
  }

  private handleSuccessfulVerification(otpCode: string): void {
    if (this.otpType === "account_verification") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/reset-password'], {
        queryParams: {
          email: this.email,
          otpCode: otpCode
        }
      });
    }
  }

  resendOtp(): void {
    if (!this.canResend || !this.email || !this.otpType) return;

    const otpPurpose = this.otpType as 'account_verification' | 'password_reset';
    
    this.authService.resendOtp(this.email, otpPurpose).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toastr.success('New OTP sent to your email');
          this.startCountdown();
        } else {
          this.toastr.error('Failed to resend OTP');
        }
      },
      error: (error) => {
        if (error.status === 429) {
          this.toastr.error('Please wait before requesting another OTP');
        } else {
          this.toastr.error('Failed to resend OTP. Please try again');
        }
      }
    });
  }
}