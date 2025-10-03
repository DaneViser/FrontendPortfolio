import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom Validator Function
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // If controls are not yet available, or password has its own error, return
  if (!password || !confirmPassword || password.errors) {
    return null;
  }

  // Set error on confirmPassword control if passwords do not match
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mismatch: true });
    return { mismatch: true }; // You can also return an error on the group
  } else {
    // If they do match, and the mismatch error exists, clear it
    if (confirmPassword.hasError('mismatch')) {
        confirmPassword.setErrors(null);
    }
    return null;
  }
};