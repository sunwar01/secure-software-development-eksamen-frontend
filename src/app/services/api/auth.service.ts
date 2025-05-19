import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {catchError, Observable, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private accessToken: string | null = null;
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem(this.TOKEN_KEY);
  }


  register(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, credentials);
  }

  login(credentials: { username: string; password: string }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/api/auth/login`, credentials, { withCredentials: true })
      .pipe(
        tap(response => {
          this.accessToken = response.accessToken;
          localStorage.setItem(this.TOKEN_KEY, response.accessToken);
        })
      );
  }

  refresh(): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/api/auth/refresh`, {}, { withCredentials: true })
      .pipe(
        tap(response => {
          this.accessToken = response.accessToken;
          localStorage.setItem(this.TOKEN_KEY, response.accessToken);
          if (!environment.production) {
            console.log('Token refreshed, accessToken saved:', response.accessToken);
          }
        }),
        catchError(error => {
          if (!environment.production) {
            console.error('Refresh token failed:', error);
          }
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
      withCredentials: true
    }).pipe(
      tap(() => {
        this.accessToken = null;
        localStorage.removeItem(this.TOKEN_KEY);
      })
    );
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }




}
