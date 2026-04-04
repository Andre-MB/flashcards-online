import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { ModeModal } from '../../shared/mode-modal/mode-modal';
import { StudyMode } from '../../types/study-mode';
// import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [MatExpansionModule, NgFor, ModeModal],

  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  folders = [
    {
      name: 'Programação',
      open: false,
      decks: [
        { id: '1', name: 'JavaScript' },
        { id: '2', name: 'Angular' },
      ],
    },
    {
      name: 'Inglês',
      open: false,
      decks: [
        { id: '3', name: 'Verbos' },
        { id: '4', name: 'Vocabulário' },
      ],
    },
  ];

  toggleFolder(folder: any) {
    folder.open = !folder.open;
  }

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  selectedDeckId: string | null = null;
  showModal = false;

  openDeck(deckId: string) {
    this.selectedDeckId = deckId;
    this.showModal = true;
  }

  onModeSelected(mode: StudyMode) {
    this.showModal = false;

    this.router.navigate(['/deck', this.selectedDeckId], {
      queryParams: { mode },
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
