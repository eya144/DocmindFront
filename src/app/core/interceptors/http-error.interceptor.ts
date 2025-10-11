import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function httpErrorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const notificationService = inject(NotificationService);
  
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';
      
      if (error.error instanceof ErrorEvent) {
        // Erreur côté client
        errorMessage = `Erreur: ${error.error.message}`;
      } else {
        // Erreur côté serveur
        errorMessage = `Erreur ${error.status}: ${error.statusText}`;
        
        if (error.status === 401) {
          errorMessage = 'Non autorisé. Veuillez vous connecter.';
        } else if (error.status === 404) {
          errorMessage = 'Ressource non trouvée';
        } else if (error.status >= 500) {
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
        }
      }

      notificationService.error(errorMessage, 'Erreur HTTP');
      return throwError(() => error);
    })
  );
}
