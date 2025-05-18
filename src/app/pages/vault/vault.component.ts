import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {AuthService} from '../../services/api/auth.service';
import {environment} from '../../../environment/environment';


@Component({
  selector: 'app-vault',
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './vault.component.html',
  standalone: true,
  styleUrl: './vault.component.css'
})
export class VaultComponent {

  constructor(private router: Router,private authService: AuthService) {


  }

  logout() {

    this.authService.logout().subscribe({
      next: (response: any) => {
        if (!environment.production) {
          console.log('Logout successful:', response);
        }
      },
      error: (error: any) => {
        if (!environment.production) {
          console.error('Logout failed:', error);
        }
      },
      complete: () => {
        if (!environment.production) {
          console.log('Logout request completed');
        }
        this.router.navigate(['/login']);
      }
    });


  }



}
