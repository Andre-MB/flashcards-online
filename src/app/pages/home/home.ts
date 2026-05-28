import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { ModeModal } from '../../shared/mode-modal/mode-modal';
import { StudyMode } from '../../types/study-mode';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from '../../app';
import { NewFolderModal } from '../../shared/new-folder-modal/new-folder-modal';
import { ImportDeckModal } from '../../shared/import-deck-modal/import-deck-modal';

bootstrapApplication(App, {
  providers: [provideAnimations()],
});

@Component({
  selector: 'app-home',
  imports: [MatExpansionModule, ModeModal, NewFolderModal, ImportDeckModal],
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  animations: [
    trigger('accordion', [
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        }),
      ),
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
        }),
      ),
      transition('closed <=> open', [animate('250ms ease-in-out')]),
    ]),
  ],
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

  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  goToCreate() {
    this.router.navigate(['deck/new']);
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

  showModalNewFolder = false;

  openNewFolderModal() {
    this.showModalNewFolder = true;
    if (this.sidebarOpen === true) {
      this.sidebarOpen = false;
    }
  }

  closeNewFolderModal() {
    this.showModalNewFolder = false;
  }

  showImportDeckModal = false;

  openImportDeckModal() {
    this.showImportDeckModal = true;
    if (this.sidebarOpen === true) {
      this.sidebarOpen = false;
    }
  }

  closeImportDeckModal() {
    this.showImportDeckModal = false;
  }

  // onFolderCreated(folderName: string) {
  //   if (folderName) {
  //     this.folders.push({
  //       name: folderName,
  //       open: false,
  //       decks: [],
  //     });
  //   }
  //   this.closeNewFolderModal();
  // }
}
