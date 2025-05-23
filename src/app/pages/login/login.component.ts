import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {environment} from '../../../environment/environment';
import {AuthService} from '../../services/api/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20), ]],
      password: ['', [Validators.required,  Validators.maxLength(50), ]]
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
        },
        error: (error: any) => {
          if (!environment.production) {
            console.error('Login failed:', error);
          }
        },
        complete: () => {
          if (!environment.production) {
            console.log('Login request completed');
          }
          this.router.navigate(['/vault']);
        }
      });
    } else {
      if (!environment.production) {
        console.log('Form is invalid');
        }
      }
    }
  }
