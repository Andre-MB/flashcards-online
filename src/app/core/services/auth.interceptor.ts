import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Se o token existir, clona a requisição e adiciona o cabeçalho de Autorização
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // Se não houver token (ex: na própria requisição de login), segue normalmente
  return next(req);
};