import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './core/guards/auth-guard';
import { Deck } from './pages/deck/deck';
import { NewDeck } from '../app/pages/new-deck/new-deck';
import { EditDeck } from './pages/edit-deck/edit-deck';
import { EsqueciSenha } from './pages/esqueci-senha/esqueci-senha';
import { LoginRecuperacao } from './pages/login-recuperacao/login-recuperacao';
import { RedefinirSenha } from './pages/redefinir-senha/redefinir-senha';
import { Registrar } from './pages/registrar/registrar';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'deck/new', component: NewDeck, canActivate: [authGuard] },
  { path: 'deck/edit/:id', component: EditDeck, canActivate: [authGuard] },
  { path: 'deck/:id', component: Deck, canActivate: [authGuard] },
  { path: 'esqueci-senha', component: EsqueciSenha },
  { path: 'login-recuperacao', component: LoginRecuperacao },
  { path: 'redefinir-senha', component: RedefinirSenha },
  { path: 'registrar', component: Registrar}
];
