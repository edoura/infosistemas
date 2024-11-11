import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppCheckTokenResult } from '@firebase/app-check';
import { Observable, from } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { APPCHECK_TOKEN, FirebaseAppCheckService } from '../services/firebase-app-check.service';

@Injectable()
export class FirebaseAppCheckInterceptor implements HttpInterceptor {

  constructor(private readonly appCheckService: FirebaseAppCheckService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.appCheckService.getToken()).pipe(
      take(1),
      switchMap((token: AppCheckTokenResult | undefined) => {
        if (token) {
          request = request.clone({
            setHeaders: { "X-Firebase-AppCheck": token?.token },
          });
        }
        return next.handle(request).pipe(
          catchError((error) => {
            // Se encontrar um erro relacionado ao token, remova-o do armazenamento local
            if (error instanceof HttpErrorResponse && error.status === 401) {
              localStorage.removeItem(APPCHECK_TOKEN);
            }
            throw error;
          })
        );
      }),
    );
  }
}

