import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // injection du service d'authentification
  const authService = inject(AuthService);
  // injection du router
  const router = inject(Router);

  return authService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        return true;
      } else {
        router.navigate(['/signin']);
        return false;
      }
    });
  
};
