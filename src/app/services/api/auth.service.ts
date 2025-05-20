import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {
  }


  register(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, credentials, { withCredentials: true });
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials, { withCredentials: true });
  }

  refresh(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/refresh`, {}, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/logout`, {}, { withCredentials: true });
  }






}
