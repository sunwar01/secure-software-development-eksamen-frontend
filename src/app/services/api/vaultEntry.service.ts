import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable,  throwError} from 'rxjs';
import {vaultEntryCreate} from '../../models/vaultEntry/dto/vaultEntryCreate';
import {vaultEntryGet} from '../../models/vaultEntry/dto/vaultEntryGet';


@Injectable ({
  providedIn: 'root'
})

export class VaultEntryService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  getVaultEntries(): Observable<vaultEntryGet[]> {
    return this.http.get<vaultEntryGet[]>(
      `${this.apiUrl}/api/vault/getVaultEntries`,
      { withCredentials: true }
    ).pipe(
      catchError(error => {
        console.error('Error fetching vault entries:', error);
        return throwError(() => new Error('Failed to load vault entries'));
      })
    );
  }

  deleteVaultEntry(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/api/vault/deleteVaultEntry${id}`,
      { withCredentials: true }
    ).pipe(
      catchError(error => {
        console.error('Error deleting vault entry:', error);
        return throwError(() => new Error('Failed to delete vault entry'));
      })
    );
  }

  createVaultEntry(entry: vaultEntryCreate): Observable<vaultEntryCreate> {
    return this.http.post<vaultEntryCreate>(
      `${this.apiUrl}/api/vault/createVaultEntry`,
      entry,
      { withCredentials: true }
    ).pipe(
      catchError(error => {
        console.error('Error creating vault entry:', error);
        return throwError(() => new Error('Failed to create vault entry'));
      })
    );
  }
}
