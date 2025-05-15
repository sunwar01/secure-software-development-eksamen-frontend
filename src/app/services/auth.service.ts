import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }
}
