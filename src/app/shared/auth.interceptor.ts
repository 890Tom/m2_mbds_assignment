import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  const header: { [key: string]: string } = { 
    'Content-Type': 'application/json', 
    'Accept' : 'application/json'
  };

  if(authService.getToken() !== null && authService.getToken() !== undefined) {
    header['Authorization'] = `Bearer ${authService.getToken()}`;
  }

  const authReq = req.clone({
    setHeaders: header
  })
  
  return next(authReq);
};
