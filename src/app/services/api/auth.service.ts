import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {catchError, Observable, switchMap, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}


  register(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, credentials);
  }

  login(credentials: { username: string; password: string }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/api/auth/login`, credentials, { withCredentials: true })
      .pipe(
        tap(response => {
          this.accessToken = response.accessToken;
        })
      );
  }

  refresh(): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/api/auth/refresh`, {}, { withCredentials: true })
      .pipe(
        tap(response => {
          this.accessToken = response.accessToken;
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
      })
    );
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  handleUnauthorized(request: Observable<any>): Observable<any> {
    return request.pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.refresh().pipe(
            switchMap(() => request)
          );
        }
        return throwError(() => error);
      })
    );
  }


}
