import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {AuthService} from '../../services/api/auth.service';
import {environment} from '../../../environment/environment';
import {VaultEntryService} from '../../services/api/vaultEntry.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatList, MatListItem} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {vaultEntryCreate} from '../../models/vaultEntry/dto/vaultEntryCreate';
import {vaultEntry} from '../../models/vaultEntry/vaultEntry';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';



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
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
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

  vaultEntries: vaultEntry[] = [];
  selectedEntry: vaultEntry | null = null;
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
      next: (entries: vaultEntry[]) => {
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
  openContextMenu(event: MouseEvent, entry: vaultEntry): void {
    event.preventDefault();
    this.selectedEntry = entry;
  }


  editEntry(vaultEntry: vaultEntryCreate) {

  }

  deleteEntry(vaultEntry: vaultEntryCreate) {

  }
}
