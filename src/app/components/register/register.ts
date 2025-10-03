import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { passwordMatchValidator } from '../../../shared/validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], // Good to have minLength
      confirmPassword: ['', Validators.required]
    }, {
      // Add the custom validator to the form group
      validators: passwordMatchValidator
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if(this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log(this.registerForm.value);
    }
  }

    // Helper getter to easily access form controls in the template
  get f() { return this.registerForm.controls; }
}

