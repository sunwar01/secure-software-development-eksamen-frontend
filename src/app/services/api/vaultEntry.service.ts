import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';

@Injectable ({
  providedIn: 'root'
})

export class VaultEntryService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  getVaultEntries() {
    return this.http.get(`${this.apiUrl}/api/vault/getVaultEntries`);
  }

  createVaultEntry(vaultEntry: any) {
    return this.http.post(`${this.apiUrl}/api/vault/createVaultEntry`, vaultEntry);
  }

  updateVaultEntry(id: number, vaultEntry: any) {
    return this.http.put(`${this.apiUrl}/api/vault/updateVaultEntry/${id}`, vaultEntry);
  }

  deleteVaultEntry(id: number) {
    return this.http.delete(`${this.apiUrl}/api/vault/deleteVaultEntry/${id}`);
  }




}
