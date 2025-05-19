import {HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {AuthService} from './services/api/auth.service';


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refresh().pipe(
          switchMap(() => {
            const newReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${authService.getAccessToken()}`),
            });
            return next(newReq);
          }),
          catchError(refreshError => {
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
