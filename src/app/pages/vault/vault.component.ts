import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {AuthService} from '../../services/api/auth.service';
import {environment} from '../../../environment/environment';
import {VaultEntryService} from '../../services/api/vaultEntry.service';
import {MatList, MatListItem} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {vaultEntryCreate} from '../../models/vaultEntry/dto/vaultEntryCreate';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {vaultEntryGet} from '../../models/vaultEntry/dto/vaultEntryGet';



@Component({
  selector: 'app-vault',
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatListItem,
    NgIf,
    MatIconButton,
    MatList,
    NgForOf,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
  ],
  templateUrl: './vault.component.html',
  standalone: true,
  styleUrl: './vault.component.css'
})
export class VaultComponent implements OnInit {

  vaultEntries: vaultEntryGet[] = [];
  selectedEntry: vaultEntryGet | null = null;
  createVaultEntryForm: FormGroup;


  constructor(private router: Router,private authService: AuthService, private vaultEntryService: VaultEntryService, private fb: FormBuilder,) {


    this.createVaultEntryForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      url: [''],
      notes: [''],
    });

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


  createVaultEntry(): void {
    if (this.createVaultEntryForm.invalid) {
      this.createVaultEntryForm.markAllAsTouched();
      return;
    }

    const entry: vaultEntryCreate = this.createVaultEntryForm.value;
    this.vaultEntryService.createVaultEntry(entry).subscribe({
      next: (newEntry: vaultEntryCreate) => {
        this.createVaultEntryForm.reset();
        if (!environment.production) {
          console.log('Vault entry created successfully:', newEntry);
        }
      },
      error: (error: Error) => {
        if (!environment.production) {
          console.error('Error creating vault entry:', error);
        }
        alert('Failed to create vault entry');
      },
    });
  }

  ngOnInit(): void {
    this.vaultEntryService.getVaultEntries().subscribe({
      next: (entries: vaultEntryGet[]) => {
        if (!environment.production) {
          console.log('Vault entries fetched successfully:', entries);
        }
        this.vaultEntries = entries;
      },
      error: (error: Error) => {
        if (!environment.production) {
          console.error('Error fetching vault entries:', error);
        }
      },
      complete: () => {
        if (!environment.production) {
          console.log('Vault entries fetch request completed');
        }
      },
    });
  }
  openContextMenu(event: MouseEvent, entry: vaultEntryGet): void {
    event.preventDefault();
    this.selectedEntry = entry;
  }


  deleteEntry(vaultEntry: vaultEntryGet) {
    this.vaultEntryService.deleteVaultEntry(vaultEntry.id).subscribe({
      next: () => {
        if (!environment.production) {
          console.log('Vault entry deleted successfully:', vaultEntry.id);
        }

      },
      error: (error: Error) => {
        if (!environment.production) {
          console.error('Error deleting vault entry:', error);
        }
      },
      complete: () => {
        if (!environment.production) {
          console.log('Vault entry delete request completed');
        }
      },
    });
  }
}
