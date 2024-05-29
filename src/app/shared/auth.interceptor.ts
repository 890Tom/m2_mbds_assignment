import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loadingService = inject(LoaderService);
  const router = inject(Router);

  var totalRequests = 0;

  loadingService.setLoading(true);

  const header: { [key: string]: string } = { 
    'Content-Type': 'application/json', 
    'Accept' : 'application/json'
  };

  if(authService.getToken() !== null && authService.getToken() !== undefined) {
    if (authService.isTokenExpired()) {
      router.navigate(['/signin']);  // ou rediriger vers la page de connexion
    }

    header['Authorization'] = `Bearer ${authService.getToken()}`;
  }

  const authReq = req.clone({
    setHeaders: header
  });

  
  
  return next(authReq).pipe(
    finalize(() => {
      loadingService.setLoading(false);
    })
  );
};
