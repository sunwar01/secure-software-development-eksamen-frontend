import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable,  throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {vaultEntry} from '../../models/vaultEntry/vaultEntry';
import {vaultEntryCreate} from '../../models/vaultEntry/dto/vaultEntryCreate';


@Injectable ({
  providedIn: 'root'
})

export class VaultEntryService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient, private authService: AuthService) {}

  getVaultEntries(): Observable<vaultEntry[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http.get<vaultEntry[]>(
      `${this.apiUrl}/api/vault/getVaultEntries`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  deleteVaultEntry(id: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http.delete<void>(
      `${this.apiUrl}/api/vault/${id}`,
      { headers, withCredentials: true }
    ).pipe(
      catchError(error => {
        console.error('Error deleting vault entry:', error);
        return throwError(() => new Error('Failed to delete vault entry'));
      })
    );
  }


  createVaultEntry(entry: vaultEntryCreate): Observable<vaultEntryCreate> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http.post<vaultEntryCreate>(
      `${this.apiUrl}/api/vault/createVaultEntry`,
      entry,
      { headers, withCredentials: true }
    ).pipe(
      catchError(error => {
        console.error('Error creating vault entry:', error);
        return throwError(() => new Error('Failed to create vault entry'));
      })
    );
  }

  updateVaultEntry(entry: vaultEntry): Observable<vaultEntry> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http.put<vaultEntry>(
      `${this.apiUrl}/api/vault/update/${entry.id}`,
      entry,
      { headers, withCredentials: true }
    ).pipe(
      catchError(error => {
        console.error('Error updating vault entry:', error);
        return throwError(() => new Error('Failed to update vault entry'));
      })
    );
  }






}
