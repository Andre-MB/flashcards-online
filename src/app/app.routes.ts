import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './core/guards/auth-guard';
import { Deck } from './pages/deck/deck';
import { NewDeck } from '../app/pages/new-deck/new-deck';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'deck/new', component: NewDeck, canActivate: [authGuard] },
  { path: 'deck/:id', component: Deck, canActivate: [authGuard] },
];
