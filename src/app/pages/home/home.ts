import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatExpansionModule, NgFor],

  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  folders = [
    {
      name: 'Programação',
      decks: [
        { id: '1', name: 'JavaScript' },
        { id: '2', name: 'Angular' },
      ],
    },
    {
      name: 'Inglês',
      decks: [
        { id: '3', name: 'Verbos' },
        { id: '4', name: 'Vocabulário' },
      ],
    },
  ];
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  openDeck(id: string) {
    this.router.navigate(['/deck', id]);
  }
}
