import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, password: string) {
    if (email === 'admin' && password === '123') {
      localStorage.setItem('token', 'fake-jwt');
      return true;
    }
    return false;
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
