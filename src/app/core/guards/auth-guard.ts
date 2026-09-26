import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se tem o token salvo, permite o acesso à rota
  if (authService.isLogged()) {
    return true;
  }

  // Se não tem, redireciona de volta para o login
  router.navigate(['/']);
  return false;
};