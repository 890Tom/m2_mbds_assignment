import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  // injection du service d'authentification
  const authService = inject(AuthService);
  // injection du router
  const router = inject(Router);
  
  return authService.isAdmin().then(isAdmin=>{
    if (isAdmin) {
      return true;
    } else {
      router.navigate(['/signin']);
      return false;
    }
  });
};
