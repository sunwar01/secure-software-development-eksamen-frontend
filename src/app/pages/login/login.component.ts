import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {environment} from '../../../environment/environment';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9_-]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*?_])[A-Za-z\\d!@#$%^&*?_]+$')]]


    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (!environment.production) {
        console.log('Form submitted:', { username: this.loginForm.value.username });
      }
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (!environment.production) {
            console.log('Login successful:', response);
          }
          // login logik her, når backend er klar
        },
        error: (error: any) => {
          if (!environment.production) {
            console.error('Login failed:', error);
          }
          // login fejl logik her, når backend er klar
        },
        complete: () => {
          if (!environment.production) {
            console.log('Login request completed');
          }
        }
      });
    } else {
      if (!environment.production) {
        console.log('Form is invalid');
        }
      }
    }
  }
