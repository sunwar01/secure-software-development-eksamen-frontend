import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';


@Component({
  selector: 'app-vault',
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule
  ],
  templateUrl: './vault.component.html',
  standalone: true,
  styleUrl: './vault.component.css'
})
export class VaultComponent {

}
