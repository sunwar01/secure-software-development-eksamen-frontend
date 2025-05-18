import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {environment} from '../../../environment/environment';
import {AuthService} from '../../services/api/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9_-]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*?_])[A-Za-z\\d!@#$%^&*?_]+$')]]


    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (!environment.production) {
        console.log('Form submitted:', { username: this.registerForm.value.username });
      }
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          if (!environment.production) {
            console.log('Register successful:', response);
          }
          this.router.navigate(['/login']);

        },
        error: (error: any) => {
          if (!environment.production) {
            console.error('Register failed:', error);
          }

        },
        complete: () => {
          if (!environment.production) {
            console.log('Register request completed');
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
