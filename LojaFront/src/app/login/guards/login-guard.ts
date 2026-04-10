import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login-service';

export const loginGuard: CanActivateFn = (route, state): boolean => {
  const service: LoginService = inject(LoginService);
  const router: Router = inject(Router);
  console.log(service.isLogged())
  if (service.isLogged()) {
    return true;
  }
  router.navigate(['/login']).then();
  return false;
};
