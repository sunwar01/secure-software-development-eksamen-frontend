import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './services/api/auth.service';
import { Router } from '@angular/router';
import {environment} from '../environment/environment';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requestWithCredentials = req.clone({
    withCredentials: true
  });

  return next(requestWithCredentials).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;
        return authService.refresh().pipe(
          switchMap(() => {
            isRefreshing = false;
            if (!environment.production) {
              console.log('Tokens has been refreshed', error);
            }
            return next(requestWithCredentials);
          }),
          catchError(refreshError => {
            isRefreshing = false;
            router.navigate(['/login']);
            return throwError(() => new Error('Refresh failed, redirected to login'));
          })
        );
      }
      return throwError(() => error);
    })
  );
};
